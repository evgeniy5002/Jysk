using System.Collections.Generic;
using Jysk.BLL.DTO;
using Jysk.BLL.Interfaces;
using Jysk.DAL.EF;
using LoggerLib;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Jysk.Server.Controllers
{
    [ApiController]
    [Route("api/Manufacturer")]
    public class ManufacturerController : ControllerBase
    {
        private readonly IManufacturerService db;
        public ManufacturerController(IManufacturerService db)
        {
            this.db = db;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ManufacturerDTO>>> GetAllManufacturer([FromQuery] string sort, [FromQuery] int page, [FromQuery] int pageSize, [FromQuery] bool isOptions = false)
        {
            IEnumerable<ManufacturerDTO> items;
            if (isOptions)
            {
                return new ObjectResult(await db.GetAll(sort));
            }
            else
            {
                IEnumerable<ManufacturerDTO> arr = await db.GetAll(sort);
                items = CreatePage(page, pageSize, arr);
                return new ObjectResult(items);
            }
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<ManufacturerDTO>> GetManufacturer(int id)
        {
            var res = await db.GetById(id);
            if (res == null)
            {
                return NotFound();
            }
            return new ObjectResult(res);
        }
        [HttpPut]
        public async Task<ActionResult<ManufacturerDTO>> PutManufacturer(ManufacturerDTO manufacturer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Logger log = new Logger();
            log.Log(manufacturer.Id.ToString() + manufacturer.Name);
            await db.Update(manufacturer);
            return Ok(manufacturer);
        }
        [HttpPost]
        public async Task<ActionResult<ManufacturerDTO>> PostManufacturer(ManufacturerDTO manufacturer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await db.Create(manufacturer);
            return Ok(manufacturer);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<ManufacturerDTO>> DeleteManufacturer(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await db.Delete(id);
            return Ok(id);
        }

        private IEnumerable<ManufacturerDTO> CreatePage(int page, int pageSize, IEnumerable<ManufacturerDTO> list)
        {
            IEnumerable<ManufacturerDTO> result = new List<ManufacturerDTO>();
            list = list.Skip(((page-1)*pageSize));
            var enumerator = list.GetEnumerator();
            for (int i = 0; i < pageSize; i++)
            {
                if (enumerator.MoveNext())
                {
                    result = result.Append(enumerator.Current);
                }
            }
            return result;
        }
    }
}
