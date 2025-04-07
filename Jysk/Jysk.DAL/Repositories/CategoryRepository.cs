using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using Jysk.DAL.EF;
using Jysk.DAL.Entities;
using Jysk.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Jysk.DAL.Repositories
{
    public class CategoryRepository : IRepository<Category>
    {
        private JyskContext db;
        public CategoryRepository(JyskContext db)
        {
            this.db = db;
        }
        public async Task<IEnumerable<Category>> GetAll()
        {
            return await db.T_Category.ToListAsync();
        }
        public async Task<Category> Get(int id)
        {
            Category category = await db.T_Category.FindAsync(id);
            return category;
        }
        public async Task Create(Category category)
        {
            await db.T_Category.AddAsync(category);
        }
        public void Update(Category category)
        {
            db.Entry(category).State = EntityState.Modified;
        }
        public async Task Delete(int id)
        {
            Category category = await db.T_Category.FindAsync(id);
            if(category != null)
            {
                db.T_Category.Remove(category);
            }
        }
    }
}
