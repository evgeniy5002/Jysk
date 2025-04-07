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
    public class StorageRepository : IRepository<Storage>
    {
        private JyskContext db;
        public StorageRepository(JyskContext db)
        {
            this.db = db;
        }
        public async Task<IEnumerable<Storage>> GetAll()
        {
            return await db.T_Storage.ToListAsync();
        }
        public async Task<Storage> Get(int id)
        {
            Storage storage = await db.T_Storage.FindAsync(id);
            return storage;
        }
        public async Task Create(Storage storage)
        {
            await db.T_Storage.AddAsync(storage);
        }
        public void Update(Storage storage)
        {
            db.Entry(storage).State = EntityState.Modified;
        }
        public async Task Delete(int id)
        {
            Storage storage = await db.T_Storage.FindAsync(id);
            if (storage != null)
            {
                db.T_Storage.Remove(storage);
            }
        }
    }
}
