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
    public class DeliveryRepository : IRepository<Delivery>
    {
        private JyskContext db;
        public DeliveryRepository(JyskContext db)
        {
            this.db = db;
        }
        public async Task<IEnumerable<Delivery>> GetAll()
        {
            return await db.T_Delivery.ToListAsync();
        }
        public async Task<Delivery> Get(int id)
        {
            Delivery delivery = await db.T_Delivery.FindAsync(id);
            return delivery;
        }
        public async Task Create(Delivery delivery)
        {
            await db.T_Delivery.AddAsync(delivery);
        }
        public void Update(Delivery delivery)
        {
            db.Entry(delivery).State = EntityState.Modified;
        }
        public async Task Delete(int id)
        {
            Delivery delivery = await db.T_Delivery.FindAsync(id);
            if (delivery != null)
            {
                db.T_Delivery.Remove(delivery);
            }
        }
    }
}
