using Jysk.BLL.DTO;
using Jysk.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/Client")]
public class ClientController : ControllerBase
{
    private readonly IClientService db;
    public ClientController(IClientService db)
    {
        this.db = db;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ClientDTO>>> GetAllClient([FromQuery] string sort, [FromQuery] int page, [FromQuery] int pageSize, [FromQuery] bool isOptions = false)
    {
        IEnumerable<ClientDTO> items;
        if (isOptions)
        {
            return new ObjectResult(await db.GetAll(sort));
        }
        else
        {
            IEnumerable<ClientDTO> arr = await db.GetAll(sort);
            items = CreatePage(page, pageSize, arr);
            return new ObjectResult(items);
        }
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<ClientDTO>> GetClient(int id)
    {
        var res = await db.GetById(id);
        if (res == null)
        {
            return NotFound();
        }
        return new ObjectResult(res);
    }
    [HttpPut]
    public async Task<ActionResult<ClientDTO>> PutClient(ClientDTO client)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Update(client);
        return Ok(client);
    }
    [HttpPost]
    public async Task<ActionResult<ClientDTO>> PostClient(ClientDTO client)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Create(client);
        return Ok(client);
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult<ClientDTO>> DeleteClient(int id)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Delete(id);
        return Ok(id);
    }
    private IEnumerable<ClientDTO> CreatePage(int page, int pageSize, IEnumerable<ClientDTO> list)
    {
        IEnumerable<ClientDTO> result = new List<ClientDTO>();
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