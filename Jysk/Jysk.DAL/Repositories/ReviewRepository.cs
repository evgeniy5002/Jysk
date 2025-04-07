using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Jysk.DAL.EF;
using Jysk.DAL.Entities;
using Jysk.DAL.Interfaces;
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
        public async Task<IEnumerable<Review>> GetAll()
        {
            return await db.T_Review.ToListAsync();
        }
        public async Task<Review> Get(int id)
        {
            Review review = await db.T_Review.FindAsync(id);
            return review;
        }
        public async Task Create(Review review)
        {
            await db.T_Review.AddAsync(review);
        }
        public void Update(Review review)
        {
            db.Entry(review).State = EntityState.Modified;
        }
        public async Task Delete(int id)
        {
            Review review = await db.T_Review.FindAsync(id);
            if (review != null)
            {
                db.T_Review.Remove(review);
            }
        }
    }
}
