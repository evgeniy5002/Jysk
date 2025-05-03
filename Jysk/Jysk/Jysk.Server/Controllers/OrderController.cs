using Jysk.BLL.DTO;
using Jysk.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/Order")]
public class OrderController : ControllerBase
{
    private readonly IOrderService db;
    public OrderController(IOrderService db)
    {
        this.db = db;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<OrderDTO>>> GetAllOrder([FromQuery] string sort, [FromQuery] int page, [FromQuery] int pageSize)
    {
        IEnumerable<OrderDTO> arr = await db.GetAll(sort);
        IEnumerable<OrderDTO> items = CreatePage(page, pageSize, arr);
        return new ObjectResult(items);
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<OrderDTO>> GetOrder(int id)
    {
        var res = await db.GetById(id);
        if (res == null)
        {
            return NotFound();
        }
        return new ObjectResult(res);
    }
    [HttpPut]
    public async Task<ActionResult<OrderDTO>> PutOrder(OrderDTO order)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Update(order);
        return Ok(order);
    }
    [HttpPost]
    public async Task<ActionResult<OrderDTO>> PostOrder(OrderDTO order)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Create(order);
        return Ok(order);
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult<OrderDTO>> DeleteOrder(int id)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Delete(id);
        return Ok(id);
    }
    private IEnumerable<OrderDTO> CreatePage(int page, int pageSize, IEnumerable<OrderDTO> list)
    {
        IEnumerable<OrderDTO> result = new List<OrderDTO>();
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