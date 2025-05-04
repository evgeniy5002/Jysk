using Jysk.BLL.DTO;
using Jysk.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/Review")]
public class ReviewController : ControllerBase
{
    private readonly IReviewService db;
    public ReviewController(IReviewService db)
    {
        this.db = db;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ReviewDTO>>> GetAllReview([FromQuery] string sort, [FromQuery] int page, [FromQuery] int pageSize)
    {
        IEnumerable<ReviewDTO> arr = await db.GetAll(sort);
        IEnumerable<ReviewDTO> items = CreatePage(page, pageSize, arr);
        return new ObjectResult(items);
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<ReviewDTO>> GetReview(int id)
    {
        var res = await db.GetById(id);
        if (res == null)
        {
            return NotFound();
        }
        return new ObjectResult(res);
    }
    [HttpPut]
    public async Task<ActionResult<ReviewDTO>> PutReview(ReviewDTO review)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Update(review);
        return Ok(review);
    }
    [HttpPost]
    public async Task<ActionResult<ReviewDTO>> PostReview(ReviewDTO review)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Create(review);
        return Ok(review);
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult<ReviewDTO>> DeleteReview(int id)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        await db.Delete(id);
        return Ok(id);
    }
    private IEnumerable<ReviewDTO> CreatePage(int page, int pageSize, IEnumerable<ReviewDTO> list)
    {
        IEnumerable<ReviewDTO> result = new List<ReviewDTO>();
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