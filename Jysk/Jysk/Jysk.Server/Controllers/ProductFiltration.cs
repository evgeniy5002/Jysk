using Jysk.BLL.DTO;
using Jysk.BLL.Interfaces;
using Jysk.DAL.Entities;
using LoggerLib;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
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
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDTO>>> GetAllProduct([FromQuery]ProductFiltrationValues PFV, [FromQuery] string sort)
        {
            IEnumerable<ProductDTO> arr = await db.GetAll(sort);
            IEnumerable<ProductDTO> res = arr;
            Type type = PFV.GetType();
            //PFV.Category = "Chair";
            //PFV.Delivery = false;
            //PFV.Price = 0;
            //PFV.Manufacturer = null;
            //PFV.Discount = 0;
            //PFV.Rating = 0;
            logger.Log(PFV.Category);
            foreach (var prop in type.GetProperties())
            {
                PropertyInfo field = type.GetProperty(prop.Name, BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance);
                object value = field.GetValue(PFV);
                if (value is int)
                {
                    res = FiltrationByInt(res, (int)value, prop.Name);
                }
                else if (value is string)
                {
                    res = FiltrationByString(res, value.ToString(), prop.Name);
                }
                else if (value is bool)
                {
                    res = FiltrationByBool(res, (bool)value, prop.Name);
                }
            }
            return new ObjectResult(res);
        }
        private IEnumerable<ProductDTO> FiltrationByString(IEnumerable<ProductDTO> arr, string filter, string key)
        {
            var res = new List<ProductDTO>();
            if (filter != null)
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
                        if (value != null && value.ToString() == filter)
                        {
                            res.Add(item);
                        }
                    }

                }
                foreach(ProductDTO item in res)
                {
                    logger.Log(item.Category + item.Manufacturer);
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
            IEnumerable<ProductDTO> res = new List<ProductDTO>();
            if (filter != 0)
            {
                foreach (ProductDTO item in arr)
                {
                    Type type = item.GetType();
                    FieldInfo field = type.GetField(key, BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance);
                    if (field != null)
                    {
                        if ((int)field.GetValue(item) == filter)
                        {
                            res.Append(item);
                        }
                    }
                }
            }
            else
            {
                res = arr;
            }
            return res;
        }
        private IEnumerable<ProductDTO> FiltrationByBool(IEnumerable<ProductDTO> arr, bool filter, string key)
        {
            IEnumerable<ProductDTO> res = new List<ProductDTO>();
            if (filter != false)
            {
                foreach (ProductDTO item in arr)
                {
                    Type type = item.GetType();
                    FieldInfo field = type.GetField(key, BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance);
                    if (field != null)
                    {
                        if ((bool)field.GetValue(item) == filter)
                        {
                            res.Append(item);
                        }
                    }
                }
            }
            else
            {
                res = arr;
            }
            return res;
        }
    }
}
