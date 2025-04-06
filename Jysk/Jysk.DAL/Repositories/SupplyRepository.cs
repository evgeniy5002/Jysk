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
    public class SupplyRepository : IRepository<Supply>
    {
        private JyskContext db;
        public SupplyRepository(JyskContext db)
        {
            this.db = db;
        }
        public async Task<IEnumerable<Supply>> GetAll()
        {
            return await db.T_Supply.ToListAsync();
        }
        public async Task<Supply> Get(int id)
        {
            Supply supply = await db.T_Supply.FindAsync(id);
            return supply;
        }
        public async Task Create(Supply supply)
        {
            await db.T_Supply.AddAsync(supply);
        }
        public void Update(Supply supply)
        {
            db.Entry(supply).State = EntityState.Modified;
        }
        public async Task Delete(int id)
        {
            Supply supply = await db.T_Supply.FindAsync(id);
            if (supply != null)
            {
                db.T_Supply.Remove(supply);
            }
        }
    }
}
