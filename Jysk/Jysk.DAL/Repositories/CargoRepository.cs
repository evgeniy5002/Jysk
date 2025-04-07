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
    public class CargoRepository : IRepository<Cargo>
    {
        private JyskContext db;
        public CargoRepository(JyskContext db)
        {
            this.db = db;
        }
        public async Task<IEnumerable<Cargo>> GetAll()
        {
            return await db.T_Cargo.ToListAsync();
        }
        public async Task<Cargo> Get(int id)
        {
            Cargo cargo = await db.T_Cargo.FindAsync(id);
            return cargo;
        }
        public async Task Create(Cargo cargo)
        {
            await db.T_Cargo.AddAsync(cargo);
        }
        public void Update(Cargo cargo)
        {
            db.Entry(cargo).State = EntityState.Modified;
        }
        public async Task Delete(int id)
        {
            Cargo cargo = await db.T_Cargo.FindAsync(id);
            if (cargo != null)
            {
                db.T_Cargo.Remove(cargo);
            }
        }
    }
}
