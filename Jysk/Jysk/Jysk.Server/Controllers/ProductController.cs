using Jysk.BLL.DTO;
using Jysk.BLL.Interfaces;
using Jysk.DAL.Entities;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/Product")]
public class ProductController : ControllerBase
{
    private readonly IProductService db;
    public ProductController(IProductService db)
    {
        this.db = db;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductDTO>>> GetAllProduct([FromQuery] string sort, [FromQuery] int page, [FromQuery] int pageSize, [FromQuery] bool isOptions = false)
    {
        IEnumerable<ProductDTO> items;
        if (isOptions)
        {
            return new ObjectResult(await db.GetAll(sort));
        }
        else
        {
            IEnumerable<ProductDTO> arr = await db.GetAll(sort);
            items = CreatePage(page, pageSize, arr);
            return new ObjectResult(items);
        }
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<ProductDTO>> GetProduct(int id)
    {
        var res = await db.GetById(id);
        if (res == null)
        {
            return NotFound();
        }
        return new ObjectResult(res);
    }
    [HttpPut]
    public async Task<ActionResult<ProductDTO>> PutProduct(ProductDTO product)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Update(product);
        return Ok(product);
    }
    [HttpPost]
    public async Task<ActionResult<ProductDTO>> PostProduct(ProductDTO product)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Create(product);
        return Ok(product);
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult<ProductDTO>> DeleteProduct(int id)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Delete(id);
        return Ok(id);
    }
    private IEnumerable<ProductDTO> CreatePage(int page, int pageSize, IEnumerable<ProductDTO> list)
    {
        IEnumerable<ProductDTO> result = new List<ProductDTO>();
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