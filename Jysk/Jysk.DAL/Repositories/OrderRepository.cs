using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Jysk.DAL.EF;
using Jysk.DAL.Entities;
using Jysk.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Scaffolding.Metadata;

namespace Jysk.DAL.Repositories
{
    public class OrderRepository : IRepository<Order>
    {
        private JyskContext db;
        public OrderRepository(JyskContext db)
        {
            this.db = db;
        }
        public async Task<IEnumerable<Order>> GetAll()
        {
            return await db.T_Order.ToListAsync();
        }
        public async Task<Order> Get(int id)
        {
            Order order = await db.T_Order.FindAsync(id);
            return order;
        }
        public async Task Create(Order order)
        {
            await db.T_Order.AddAsync(order);
        }
        public void Update(Order order)
        {
            db.Entry(order).State = EntityState.Modified;
        }
        public async Task Delete(int id)
        {
            Order order = await db.T_Order.FindAsync(id);
            if (order != null)
            {
                db.T_Order.Remove(order);
            }
        }
    }
}
