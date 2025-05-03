using Jysk.BLL.DTO;
using Jysk.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/Storage")]
public class StorageController : ControllerBase
{
    private readonly IStorageService db;
    public StorageController(IStorageService db)
    {
        this.db = db;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<StorageDTO>>> GetAllStorage([FromQuery] string sort, [FromQuery] int page, [FromQuery] int pageSize)
    {
        IEnumerable<StorageDTO> arr = await db.GetAll(sort);
        IEnumerable<StorageDTO> items = CreatePage(page, pageSize, arr);
        return new ObjectResult(items);
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<StorageDTO>> GetStorage(int id)
    {
        var res = await db.GetById(id);
        if (res == null)
        {
            return NotFound();
        }
        return new ObjectResult(res);
    }
    [HttpPut]
    public async Task<ActionResult<StorageDTO>> PutStorage(StorageDTO storage)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Update(storage);
        return Ok(storage);
    }
    [HttpPost]
    public async Task<ActionResult<StorageDTO>> PostStorage(StorageDTO storage)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Create(storage);
        return Ok(storage);
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult<StorageDTO>> DeleteStorage(int id)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Delete(id);
        return Ok(id);
    }
    private IEnumerable<StorageDTO> CreatePage(int page, int pageSize, IEnumerable<StorageDTO> list)
    {
        IEnumerable<StorageDTO> result = new List<StorageDTO>();
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