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
    public class ProductRepository : IRepository<Product>
    {
        private JyskContext db;
        public ProductRepository(JyskContext db)
        {
            this.db = db;
        }
        public async Task<IEnumerable<Product>> GetAll()
        {
            return await db.T_Product.ToListAsync();
        }
        public async Task<Product> Get(int id)
        {
            Product product = await db.T_Product.FindAsync(id);
            return product;
        }
        public async Task Create(Product product)
        {
            await db.T_Product.AddAsync(product);
        }
        public void Update(Product product)
        {
            db.Entry(product).State = EntityState.Modified;
        }
        public async Task Delete(int id)
        {
            Product product = await db.T_Product.FindAsync(id);
            if (product != null)
            {
                db.T_Product.Remove(product);
            }
        }
    }
}
