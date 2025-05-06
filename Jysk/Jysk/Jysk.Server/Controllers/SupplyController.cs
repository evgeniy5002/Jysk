using Jysk.BLL.DTO;
using Jysk.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/Supply")]
public class SupplyController : ControllerBase
{
    private readonly ISupplyService db;
    public SupplyController(ISupplyService db)
    {
        this.db = db;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<SupplyDTO>>> GetAllSupply([FromQuery] string sort, [FromQuery] int page, [FromQuery] int pageSize, [FromQuery] bool isOptions = false)
    {
        IEnumerable<SupplyDTO> items;
        if (isOptions)
        {
            return new ObjectResult(await db.GetAll(sort));
        }
        else
        {
            IEnumerable<SupplyDTO> arr = await db.GetAll(sort);
            items = CreatePage(page, pageSize, arr);
            return new ObjectResult(items);
        }
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<SupplyDTO>> GetSupply(int id)
    {
        var res = await db.GetById(id);
        if (res == null)
        {
            return NotFound();
        }
        return new ObjectResult(res);
    }
    [HttpPut]
    public async Task<ActionResult<SupplyDTO>> PutSupply(SupplyDTO supply)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Update(supply);
        return Ok(supply);
    }
    [HttpPost]
    public async Task<ActionResult<SupplyDTO>> PostSupply(SupplyDTO supply)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Create(supply);
        return Ok(supply);
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult<SupplyDTO>> DeleteSupply(int id)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Delete(id);
        return Ok(id);
    }
    private IEnumerable<SupplyDTO> CreatePage(int page, int pageSize, IEnumerable<SupplyDTO> list)
    {
        IEnumerable<SupplyDTO> result = new List<SupplyDTO>();
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