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

namespace Jysk.DAL.Repositories
{
    public class StoreRepository : IRepository<Store>
    {
        private JyskContext db;
        public StoreRepository(JyskContext db)
        {
            this.db = db;
        }
        public async Task<IEnumerable<Store>> GetAll(string sort = "IdAsc")
        {
            IQueryable<Store>? arr = db.T_Store.Include(o => o.Storage).Include(o => o.WorkHours);
            SortState sortstate = (SortState)Enum.Parse(typeof(SortState), sort);
            arr = sortstate switch
            {
                SortState.IdAsc => arr.OrderBy(s => s.Id),
                SortState.IdDesc => arr.OrderByDescending(s => s.Id),
                SortState.NameAsc => arr.OrderBy(s => s.Name),
                SortState.NameDesc => arr.OrderByDescending(s => s.Name),
                SortState.HouseNumberAsc => arr.OrderBy(s => s.HouseNumber),
                SortState.HouseNumberDesc => arr.OrderByDescending(s => s.HouseNumber),
                SortState.TotalProductSumAsc => arr.OrderBy(s => s.TotalProductSum),
                SortState.TotalProductSumDesc => arr.OrderByDescending(s => s.TotalProductSum),
                SortState.StorageAsc => arr.OrderBy(s => s.Storage),
                SortState.StorageDesc => arr.OrderByDescending(s => s.Storage),
                SortState.PhotoAsc => arr.OrderBy(s => s.Photo),
                SortState.PhotoDesc => arr.OrderByDescending(s => s.Photo),
                SortState.WorkHoursAsc => arr.OrderBy(s => s.WorkHours),
                SortState.WorkHoursDesc => arr.OrderByDescending(s => s.WorkHours),
                _ => arr.OrderBy(s => s.Id)
            };
            return await arr.ToListAsync();
        }
        public async Task<Store> Get(int id)
        {
            var list = await db.T_Store.Include(o => o.Storage).Include(o => o.WorkHours).Where(a => a.Id == id).ToListAsync();
            Store store = list.FirstOrDefault();
            if (store == null)
            {
                Logger log = new Logger();
                log.Log("Error: Store doesnt exist");
            }
            return store;
        }
        public async Task Create(Store store)
        {
            try
            {
                await db.T_Store.AddAsync(store);
                Logger log = new Logger();
                log.Log("Store added into database successfully");
            }
            catch (Exception ex)
            {
                Logger log = new Logger();
                log.Log("Error: Exception during adding store into database\nException: " + ex.ToString());
            }
            
        }
        public void Update(Store store)
        {
            try
            {
                db.Entry(store).State = EntityState.Modified;
                Logger log = new Logger();
                log.Log("Store updated in database successfully");
            }
            catch (Exception ex)
            {
                Logger log = new Logger();
                log.Log("Error: Exception during updating store in database\nException: " + ex.ToString());
            }
            
        }
        public async Task Delete(int id)
        {
            try
            {
                Store store = await db.T_Store.FindAsync(id);
                if (store != null)
                {
                    db.T_Store.Remove(store);
                }
                Logger log = new Logger();
                log.Log("Store deleted from database successfully");
            }
            catch (Exception ex)
            {
                Logger log = new Logger();
                log.Log("Error: Exception during deleting store from database\nException: " + ex.ToString());
            }
            
        }
    }
}
