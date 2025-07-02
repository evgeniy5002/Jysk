using Jysk.BLL.DTO;
using Jysk.BLL.Interfaces;
using LoggerLib;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/User")]
public class UserController : ControllerBase
{
    private readonly IUserService db;
    public UserController(IUserService db)
    {
        this.db = db;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDTO>>> GetAllUser([FromQuery] string sort, [FromQuery] int page, [FromQuery] int pageSize, [FromQuery] bool isOptions = false)
    {
        IEnumerable<UserDTO> items;
        if (isOptions)
        {
            return new ObjectResult(await db.GetAll(sort));
        }
        else
        {
            IEnumerable<UserDTO> arr = await db.GetAll(sort);
            items = CreatePage(page, pageSize, arr);
            return new ObjectResult(items);
        }
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<UserDTO>> GetUser(int id)
    {
        var res = await db.GetById(id);
        if (res == null)
        {
            return NotFound();
        }
        return new ObjectResult(res);
    }
    [HttpPut]
    public async Task<ActionResult<UserDTO>> PutUser(UserDTO user)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Update(user);
        return Ok(user);
    }
    [HttpPost]
    public async Task<ActionResult<UserDTO>> PostUser(UserDTO user)
    {
        Logger log = new Logger();
        log.Log("Test");
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Create(user);
        return Ok(user);
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult<UserDTO>> DeleteUser(int id)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Delete(id);
        return Ok(id);
    }
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        if (db.CheckUser(request.Email, request.Password))
        {
            return Ok("User exists");
        }
        return Unauthorized();
    }
    private IEnumerable<UserDTO> CreatePage(int page, int pageSize, IEnumerable<UserDTO> list)
    {
        IEnumerable<UserDTO> result = new List<UserDTO>();
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