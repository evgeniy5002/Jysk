using Jysk.BLL.DTO;
using Jysk.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/Cargo")]
public class CargoController : ControllerBase
{
    private readonly ICargoService db;
    public CargoController(ICargoService db)
    {
        this.db = db;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CargoDTO>>> GetAllCargo([FromQuery] string sort, [FromQuery] int page, [FromQuery] int pageSize, [FromQuery] bool isOptions = false)
    {
        IEnumerable<CargoDTO> items;
        if (isOptions)
        {
            return new ObjectResult(await db.GetAll(sort));
        }
        else
        {
            IEnumerable<CargoDTO> arr = await db.GetAll(sort);
            items = CreatePage(page, pageSize, arr);
            return new ObjectResult(items);
        }
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<CargoDTO>> GetCargo(int id)
    {
        var res = await db.GetById(id);
        if (res == null)
        {
            return NotFound();
        }
        return new ObjectResult(res);
    }
    [HttpPut]
    public async Task<ActionResult<CargoDTO>> PutCargo(CargoDTO cargo)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Update(cargo);
        return Ok(cargo);
    }
    [HttpPost]
    public async Task<ActionResult<CargoDTO>> PostCargo(CargoDTO cargo)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Create(cargo);
        return Ok(cargo);
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult<CargoDTO>> DeleteCargo(int id)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Delete(id);
        return Ok(id);
    }

    private IEnumerable<CargoDTO> CreatePage(int page, int pageSize, IEnumerable<CargoDTO> list)
    {
        IEnumerable<CargoDTO> result = new List<CargoDTO>();
        list = list.Skip(((page - 1) * pageSize));
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