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
        public async Task<IEnumerable<Order>> GetAll(string sort = "IdAsc")
        {
            IQueryable<Order>? arr = db.T_Order.Include(o => o.Product).Include(o => o.User);
            SortState sortstate = (SortState)Enum.Parse(typeof(SortState), sort);
            arr = sortstate switch
            {
                SortState.IdAsc => arr.OrderBy(s => s.Id),
                SortState.IdDesc => arr.OrderByDescending(s => s.Id),
                SortState.ProductAsc => arr.OrderBy(s => s.Product.Name),
                SortState.ProductDesc => arr.OrderByDescending(s => s.Product.Name),
                SortState.FinalPriceAsc => arr.OrderBy(s => s.FinalPrice),
                SortState.FinalPriceDesc => arr.OrderByDescending(s => s.FinalPrice),
                SortState.UserAsc => arr.OrderBy(s => s.User.Name),
                SortState.UserDesc => arr.OrderByDescending(s => s.User.Name),
                SortState.MarkUpAsc => arr.OrderBy(s => s.MarkUp),
                SortState.MarkUpDesc => arr.OrderByDescending(s => s.MarkUp),
                SortState.ProductionPriceAsc => arr.OrderBy(s => s.ProductionPrice),
                SortState.ProductionPriceDesc => arr.OrderByDescending(s => s.ProductionPrice),
                _ => arr.OrderBy(s => s.Id)
            };
            return await arr.ToListAsync();
        }
        public async Task<Order> Get(int id)
        {
            var list = await db.T_Order.Include(o => o.Product).Include(o => o.User).Where(a => a.Id == id).ToListAsync();
            Order order = list.FirstOrDefault();
            if (order == null)
            {
                Logger log = new Logger();
                log.Log("Error: Order doesnt exist");
            }
            return order;
        }
        public async Task Create(Order order)
        {
            try
            {
                await db.T_Order.AddAsync(order);
                Logger log = new Logger();
                log.Log("Order added into database successfully");
            }
            catch (Exception ex)
            {
                Logger log = new Logger();
                log.Log("Error: Exception during adding order into database\nException: " + ex.ToString());
            }
            
        }
        public void Update(Order order)
        {
            try
            {
                db.Entry(order).State = EntityState.Modified;
                Logger log = new Logger();
                log.Log("Order updated in database successfully");
            }
            catch (Exception ex)
            {
                Logger log = new Logger();
                log.Log("Error: Exception during updating order in database\nException: " + ex.ToString());
            }
        }
        public async Task Delete(int id)
        {
            try
            {
                Order order = await db.T_Order.FindAsync(id);
                if (order != null)
                {
                    db.T_Order.Remove(order);
                }
                Logger log = new Logger();
                log.Log("Order deleted from database successfully");
            }
            catch (Exception ex)
            {
                Logger log = new Logger();
                log.Log("Error: Exception during deleting order from database\nException: " + ex.ToString());
            }
            
        }
    }
}
