using Jysk.BLL.DTO;
using Jysk.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/WriteOff")]
public class WriteOffController : ControllerBase
{
    private readonly IWriteOffService db;
    public WriteOffController(IWriteOffService db)
    {
        this.db = db;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<WriteOffDTO>>> GetAllWriteOff([FromQuery] string sort, [FromQuery] int page, [FromQuery] int pageSize, [FromQuery] bool isOptions = false)
    {
        IEnumerable<WriteOffDTO> items;
        if (isOptions)
        {
            return new ObjectResult(await db.GetAll(sort));
        }
        else
        {
            IEnumerable<WriteOffDTO> arr = await db.GetAll(sort);
            items = CreatePage(page, pageSize, arr);
            return new ObjectResult(items);
        }
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<WriteOffDTO>> GetWriteOff(int id)
    {
        var res = await db.GetById(id);
        if (res == null)
        {
            return NotFound();
        }
        return new ObjectResult(res);
    }
    [HttpPut]
    public async Task<ActionResult<WriteOffDTO>> PutWriteOff(WriteOffDTO writeOff)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Update(writeOff);
        return Ok(writeOff);
    }
    [HttpPost]
    public async Task<ActionResult<WriteOffDTO>> PostWriteOff(WriteOffDTO writeOff)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Create(writeOff);
        return Ok(writeOff);
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult<WriteOffDTO>> DeleteWriteOff(int id)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Delete(id);
        return Ok(id);
    }
    private IEnumerable<WriteOffDTO> CreatePage(int page, int pageSize, IEnumerable<WriteOffDTO> list)
    {
        IEnumerable<WriteOffDTO> result = new List<WriteOffDTO>();
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