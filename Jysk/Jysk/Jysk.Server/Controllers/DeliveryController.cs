using Jysk.BLL.DTO;
using Jysk.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/Delivery")]
public class DeliveryController : ControllerBase
{
    private readonly IDeliveryService db;
    public DeliveryController(IDeliveryService db)
    {
        this.db = db;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<DeliveryDTO>>> GetDelivery([FromQuery] string sort, [FromQuery] int page, [FromQuery] int pageSize)
    {
        IEnumerable<DeliveryDTO> arr = await db.GetAll(sort);
        IEnumerable<DeliveryDTO> items = CreatePage(page, pageSize, arr);
        return new ObjectResult(items);
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<DeliveryDTO>> GetDelivery(int id)
    {
        var res = await db.GetById(id);
        if (res == null)
        {
            return NotFound();
        }
        return new ObjectResult(res);
    }
    [HttpPut]
    public async Task<ActionResult<DeliveryDTO>> PutDelivery(DeliveryDTO delivery)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Update(delivery);
        return Ok(delivery);
    }
    [HttpPost]
    public async Task<ActionResult<DeliveryDTO>> PostDelivery(DeliveryDTO delivery)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Create(delivery);
        return Ok(delivery);
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult<DeliveryDTO>> DeleteDelivery(int id)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Delete(id);
        return Ok(id);
    }
    private IEnumerable<DeliveryDTO> CreatePage(int page, int pageSize, IEnumerable<DeliveryDTO> list)
    {
        IEnumerable<DeliveryDTO> result = new List<DeliveryDTO>();
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