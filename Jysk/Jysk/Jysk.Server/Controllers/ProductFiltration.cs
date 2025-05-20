using Jysk.BLL.DTO;
using Jysk.BLL.Interfaces;
using Jysk.DAL.Entities;
using LoggerLib;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Logging.Configuration;
using System.Net.Http.Headers;
using System.Reflection;

namespace Jysk.Server.Controllers
{
    [ApiController]
    [Route("api/ProductFiltration")]
    public class ProductFiltration : ControllerBase
    {
        Logger logger;
        private readonly IProductService db;
        public ProductFiltration(IProductService db)
        {
            this.db = db;
            logger = new Logger();
        }
        [HttpPost]
        public async Task<IActionResult> GetAllProduct([FromBody]ProductFiltrationValues PFV, [FromQuery] string sort)
        {
            logger.Log(sort);
            IEnumerable<ProductDTO> arr = await db.GetAll(sort);
            IEnumerable<ProductDTO> res = arr;
            Type type = PFV.GetType();
            //PFV.Category = null;
            //PFV.Delivery = false;
            //PFV.Price = [0,1000];
            //PFV.Manufacturer = null;
            //PFV.Discount = false;
            //logger.Log(PFV.Category + "" + PFV.Delivery + " " + PFV.Manufacturer  + " " + PFV.Price); 
            
            foreach (var prop in type.GetProperties())
            {
                PropertyInfo field = type.GetProperty(prop.Name, BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance);
                object value = field.GetValue(PFV);
                if (value is int[])
                {
                    res = FiltrationByIntArr(res, (int[])value, prop.Name);
                }
                else if (value is int)
                {
                    res = FiltrationByInt(res, (int)value, prop.Name);
                }
                else if (value is string[])
                {
                    res = FiltrationByString(res, (string[])value, prop.Name);
                }
                else if (value is bool)
                {
                    res = FiltrationByBool(res, (bool)value, prop.Name);
                }
            }
            return Ok(res);
        }
        [HttpGet("getcount")]
        public async Task<IEnumerable<int>> GetStringCount([FromQuery] string[] strarr, [FromQuery] string key)
        {
            IEnumerable<ProductDTO> arr = await db.GetAll("IdAsc");
            int[] iarr = new int[strarr.Length];
            for (int i = 0; i < strarr.Length; i++)
            {
                iarr[i] = 0;
            }
            Type type;
            PropertyInfo field;
            foreach (ProductDTO item in arr)
            {
                type = item.GetType();
                field = type.GetProperty(key, BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance);
                if (field != null)
                {
                    object value = field.GetValue(item);
                    if (strarr.Contains(value.ToString()))
                    {
                        int index = Array.IndexOf(strarr, value.ToString());
                        iarr[index]++;
                    }
                }
            }
            return iarr;
        }
        private IEnumerable<ProductDTO> FiltrationByString(IEnumerable<ProductDTO> arr, string[] filter, string key)
        {
            var res = new List<ProductDTO>();
            if (filter.Length > 0)
            {
                //logger.Log(filter[0]);
                Type type;
                PropertyInfo field;
                foreach (ProductDTO item in arr)
                {
                    type = item.GetType();
                    field = type.GetProperty(key, BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance);
                    if (field != null)
                    {
                        object value = field.GetValue(item);
                        if (value != null && filter.Contains(value.ToString()))
                        {
                            res.Add(item);
                        }
                    }

                }
                return res;
            }
            else
            {
                return arr;
            }
            
        }
        private IEnumerable<ProductDTO> FiltrationByInt(IEnumerable<ProductDTO> arr, int filter, string key)
        {
            var res = new List<ProductDTO>();
            if (filter != 0)
            {
                foreach (ProductDTO item in arr)
                {
                    Type type = item.GetType();
                    PropertyInfo field = type.GetProperty(key, BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance);
                    if (field != null)
                    {
                        if ((int)field.GetValue(item) == filter)
                        {
                            res.Add(item);
                        }
                    }
                }
                return res;
            }
            else
            {
                return arr;
            }
            
        }
        private IEnumerable<ProductDTO> FiltrationByBool(IEnumerable<ProductDTO> arr, bool filter, string key)
        {
            var res = new List<ProductDTO>();
            if (filter)
            {
                foreach (ProductDTO item in arr)
                {
                    Type type = item.GetType();
                    PropertyInfo field = type.GetProperty(key, BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance);
                    if (field != null)
                    {
                        if ((bool)field.GetValue(item) == filter)
                        {
                            res.Add(item);
                        }
                    }
                }
                return res;
            }
            else
            {
                return arr;
            }
        }
        private IEnumerable<ProductDTO> FiltrationByIntArr(IEnumerable<ProductDTO> arr, int[] filter, string key)
        {

            //logger.Log(filter[0].ToString() + " " + filter[1].ToString());
            var res = new List<ProductDTO>();
            if (filter.Length > 0)
            {
                Type type;
                PropertyInfo field;
                foreach (ProductDTO item in arr)
                {
                    type = item.GetType();
                    field = type.GetProperty(key, BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance);
                    if (field != null)
                    {
                        object value = field.GetValue(item);
                        if ((int)value - item.Discount >= filter[0] && (int)value - item.Discount <= filter[1])
                        {
                            res.Add(item);
                            //logger.Log(item.Name);
                        }
                        //logger.Log(filter[1].ToString() + " " + filter[0].ToString() + " " + value.ToString());
                    }
                }
                return res;
            }
            else
            {
                return arr;
            }
        }
    }
}
