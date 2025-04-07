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
    public class ManufacturerRepository : IRepository<Manufacturer>
    {
        private JyskContext db;
        public ManufacturerRepository(JyskContext db)
        {
            this.db = db;
        }
        public async Task<IEnumerable<Manufacturer>> GetAll()
        {
            return await db.T_Manufacturer.ToListAsync();
        }
        public async Task<Manufacturer> Get(int id)
        {
            Manufacturer manufacturer = await db.T_Manufacturer.FindAsync(id);
            return manufacturer;
        }
        public async Task Create(Manufacturer manufacturer)
        {
            await db.T_Manufacturer.AddAsync(manufacturer);
        }
        public void Update(Manufacturer manufacturer)
        {
            db.Entry(manufacturer).State = EntityState.Modified;
        }
        public async Task Delete(int id)
        {
            Manufacturer manufacturer = await db.T_Manufacturer.FindAsync(id);
            if (manufacturer != null)
            {
                db.T_Manufacturer.Remove(manufacturer);
            }
        }
    }
}
