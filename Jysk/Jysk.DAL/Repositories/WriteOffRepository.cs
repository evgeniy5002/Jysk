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
    public class WriteOffRepository : IRepository<WriteOff>
    {
        private JyskContext db;
        public WriteOffRepository(JyskContext db)
        {
            this.db = db;
        }
        public async Task<IEnumerable<WriteOff>> GetAll()
        {
            return await db.T_WriteOff.ToListAsync();
        }
        public async Task<WriteOff> Get(int id)
        {
            WriteOff writeOff = await db.T_WriteOff.FindAsync(id);
            return writeOff;
        }
        public async Task Create(WriteOff writeOff)
        {
            await db.T_WriteOff.AddAsync(writeOff);
        }
        public void Update(WriteOff writeOff)
        {
            db.Entry(writeOff).State = EntityState.Modified;
        }
        public async Task Delete(int id)
        {
            WriteOff writeOff = await db.T_WriteOff.FindAsync(id);
            if (writeOff != null)
            {
                db.T_WriteOff.Remove(writeOff);
            }
        }
    }
}
