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
    public class StorageRepository : IRepository<Storage>
    {
        private JyskContext db;
        public StorageRepository(JyskContext db)
        {
            this.db = db;
        }
        public async Task<IEnumerable<Storage>> GetAll(string sort = "IdAsc")
        {
            IQueryable<Storage>? arr = db.T_Storage;
            SortState sortstate = (SortState)Enum.Parse(typeof(SortState), sort);
            arr = sortstate switch
            {
                SortState.IdAsc => arr.OrderBy(s => s.Id),
                SortState.IdDesc => arr.OrderByDescending(s => s.Id),
                SortState.NameAsc => arr.OrderBy(s => s.Name),
                SortState.NameDesc => arr.OrderByDescending(s => s.Name),
                SortState.AddressAsc => arr.OrderBy(s => s.Address),
                SortState.AddressDesc => arr.OrderByDescending(s => s.Address),
                SortState.SumAsc => arr.OrderBy(s => s.Sum),
                SortState.SumDesc => arr.OrderByDescending(s => s.Sum),
                _ => arr.OrderBy(s => s.Id)
            };
            return await arr.ToListAsync();
        }
        public async Task<Storage> Get(int id)
        {
            Storage storage = await db.T_Storage.FindAsync(id);
            if (storage == null)
            {
                Logger log = new Logger();
                log.Log("Error: Storage doesnt exist");
            }
            return storage;
        }
        public async Task Create(Storage storage)
        {
            try
            {
                await db.T_Storage.AddAsync(storage);
                Logger log = new Logger();
                log.Log("Storage added into database successfully");
            }
            catch (Exception ex)
            {
                Logger log = new Logger();
                log.Log("Error: Exception during adding storage into database\nException: " + ex.ToString());
            }
            
        }
        public void Update(Storage storage)
        {
            try
            {
                db.Entry(storage).State = EntityState.Modified;
                Logger log = new Logger();
                log.Log("Storage updated in database successfully");
            }
            catch (Exception ex)
            {
                Logger log = new Logger();
                log.Log("Error: Exception during updating storage in database\nException: " + ex.ToString());
            }
            
        }
        public async Task Delete(int id)
        {
            try
            {
                Storage storage = await db.T_Storage.FindAsync(id);
                if (storage != null)
                {
                    db.T_Storage.Remove(storage);
                }
                Logger log = new Logger();
                log.Log("Storage deleted from database successfully");
            }
            catch (Exception ex)
            {
                Logger log = new Logger();
                log.Log("Error: Exception during deleting storage from database\nException: " + ex.ToString());
            }
            
        }
    }
}
