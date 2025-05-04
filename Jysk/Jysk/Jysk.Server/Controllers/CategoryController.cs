using System.Linq;
using Jysk.BLL.DTO;
using Jysk.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/Category")]
public class CategoryController : ControllerBase
{
    private readonly ICategoryService db;
    public CategoryController(ICategoryService db)
    {
        this.db = db;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CategoryDTO>>> GetAllCategory([FromQuery] string sort, [FromQuery] int page, [FromQuery] int pageSize)
    {
        IEnumerable<CategoryDTO> arr = await db.GetAll(sort);
        IEnumerable<CategoryDTO> items = CreatePage(page, pageSize, arr);
        return new ObjectResult(items);
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<CategoryDTO>> GetCategory(int id)
    {
        var res = await db.GetById(id);
        if (res == null)
        {
            return NotFound();
        }
        return new ObjectResult(res);
    }
    [HttpPut]
    public async Task<ActionResult<CategoryDTO>> PutCategory(CategoryDTO category)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Update(category);
        return Ok(category);
    }
    [HttpPost]
    public async Task<ActionResult<CategoryDTO>> PostCategory(CategoryDTO category)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Create(category);
        return Ok(category);
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult<CategoryDTO>> DeleteCategory(int id)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Delete(id);
        return Ok(id);
    }
    private IEnumerable<CategoryDTO> CreatePage(int page, int pageSize, IEnumerable<CategoryDTO> list)
    {
        IEnumerable<CategoryDTO> result = new List<CategoryDTO>();
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