using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Jysk.DAL.EF;
using Jysk.DAL.Entities;
using Jysk.DAL.Interfaces;
using LoggerLib;
using Microsoft.EntityFrameworkCore;

namespace Jysk.DAL.Repositories
{
    public class ReviewRepository : IRepository<Review>
    {
        private JyskContext db;
        public ReviewRepository(JyskContext db)
        {
            this.db = db;
        }
        public async Task<IEnumerable<Review>> GetAll(string sort = "IdAsc")
        {
            IQueryable<Review>? arr = db.T_Review.Include(o => o.Product);
            SortState sortstate = (SortState)Enum.Parse(typeof(SortState), sort);
            arr = sortstate switch
            {
                SortState.IdAsc => arr.OrderBy(s => s.Id),
                SortState.IdDesc => arr.OrderByDescending(s => s.Id),
                SortState.ProductAsc => arr.OrderBy(s => s.Product.Name),
                SortState.ProductDesc => arr.OrderByDescending(s => s.Product.Name),
                SortState.RatingAsc => arr.OrderBy(s => s.Rating),
                SortState.RatingDesc => arr.OrderByDescending(s => s.Rating),
                SortState.DescriptionAsc => arr.OrderBy(s => s.Description),
                SortState.DescriptionDesc => arr.OrderByDescending(s => s.Description),
                _ => arr.OrderBy(s => s.Id)
            };
            return await arr.ToListAsync();
        }
        public async Task<Review> Get(int id)
        {
            var list = await db.T_Review.Include(o => o.Product).Where(a => a.Id == id).ToListAsync();
            Review review = list.FirstOrDefault();
            if (review == null)
            {
                Logger log = new Logger();
                log.Log("Error: Review doesnt exist");
            }
            return review;
        }
        public async Task Create(Review review)
        {
            try
            {
                await db.T_Review.AddAsync(review);
                Logger log = new Logger();
                log.Log("Review added into database successfully");
            }
            catch (Exception ex)
            {
                Logger log = new Logger();
                log.Log("Error: Exception during adding review into database\nException: " + ex.ToString());
            }
            
        }
        public void Update(Review review)
        {
            try
            {
                db.Entry(review).State = EntityState.Modified;
                Logger log = new Logger();
                log.Log("Review updated in database successfully");
            }
            catch (Exception ex)
            {
                Logger log = new Logger();
                log.Log("Error: Exception during updating review in database\nException: " + ex.ToString());
            }
            
        }
        public async Task Delete(int id)
        {
            try
            {
                Review review = await db.T_Review.FindAsync(id);
                if (review != null)
                {
                    db.T_Review.Remove(review);
                }
                Logger log = new Logger();
                log.Log("Review deleted from database successfully");
            }
            catch (Exception ex)
            {
                Logger log = new Logger();
                log.Log("Error: Exception during deleting review from database\nException: " + ex.ToString());
            }
            
        }
    }
}
