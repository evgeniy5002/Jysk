using Jysk.BLL.DTO;
using Jysk.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/Store")]
public class StoreController : ControllerBase
{
    private readonly IStoreService db;
    public StoreController(IStoreService db)
    {
        this.db = db;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<StoreDTO>>> GetAllStore([FromQuery] string sort, [FromQuery] int page, [FromQuery] int pageSize)
    {
        IEnumerable<StoreDTO> arr = await db.GetAll(sort);
        IEnumerable<StoreDTO> items = CreatePage(page, pageSize, arr);
        return new ObjectResult(items);
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<StoreDTO>> GetStore(int id)
    {
        var res = await db.GetById(id);
        if (res == null)
        {
            return NotFound();
        }
        return new ObjectResult(res);
    }
    [HttpPut]
    public async Task<ActionResult<StoreDTO>> PutStore(StoreDTO store)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Update(store);
        return Ok(store);
    }
    [HttpPost]
    public async Task<ActionResult<StoreDTO>> PostStore(StoreDTO store)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Create(store);
        return Ok(store);
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult<StoreDTO>> DeleteStore(int id)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Delete(id);
        return Ok(id);
    }
    private IEnumerable<StoreDTO> CreatePage(int page, int pageSize, IEnumerable<StoreDTO> list)
    {
        IEnumerable<StoreDTO> result = new List<StoreDTO>();
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