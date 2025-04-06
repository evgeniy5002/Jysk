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
    public class StoreRepository : IRepository<Store>
    {
        private JyskContext db;
        public StoreRepository(JyskContext db)
        {
            this.db = db;
        }
        public async Task<IEnumerable<Store>> GetAll()
        {
            return await db.T_Store.ToListAsync();
        }
        public async Task<Store> Get(int id)
        {
            Store store = await db.T_Store.FindAsync(id);
            return store;
        }
        public async Task Create(Store store)
        {
            await db.T_Store.AddAsync(store);
        }
        public void Update(Store store)
        {
            db.Entry(store).State = EntityState.Modified;
        }
        public async Task Delete(int id)
        {
            Store store = await db.T_Store.FindAsync(id);
            if (store != null)
            {
                db.T_Store.Remove(store);
            }
        }
    }
}
