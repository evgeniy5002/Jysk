using Jysk.BLL.DTO;
using Jysk.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/WorkHours")]
public class WorkHoursController : ControllerBase
{
    private readonly IWorkHoursService db;
    public WorkHoursController(IWorkHoursService db)
    {
        this.db = db;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<WorkHoursDTO>>> GetAllWorkHours([FromQuery] string sort, [FromQuery] int page, [FromQuery] int pageSize, [FromQuery] bool isOptions = false)
    {
        IEnumerable<WorkHoursDTO> items;
        if (isOptions)
        {
            return new ObjectResult(await db.GetAll(sort));
        }
        else
        {
            IEnumerable<WorkHoursDTO> arr = await db.GetAll(sort);
            items = CreatePage(page, pageSize, arr);
            return new ObjectResult(items);
        }
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<WorkHoursDTO>> GetWorkHours(int id)
    {
        var res = await db.GetById(id);
        if (res == null)
        {
            return NotFound();
        }
        return new ObjectResult(res);
    }
    [HttpPut]
    public async Task<ActionResult<WorkHoursDTO>> PutWorkHours(WorkHoursDTO workHours)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Update(workHours);
        return Ok(workHours);
    }
    [HttpPost]
    public async Task<ActionResult<WorkHoursDTO>> PostWorkHours(WorkHoursDTO workHours)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Create(workHours);
        return Ok(workHours);
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult<WorkHoursDTO>> DeleteWorkHours(int id)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Delete(id);
        return Ok(id);
    }
    private IEnumerable<WorkHoursDTO> CreatePage(int page, int pageSize, IEnumerable<WorkHoursDTO> list)
    {
        IEnumerable<WorkHoursDTO> result = new List<WorkHoursDTO>();
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