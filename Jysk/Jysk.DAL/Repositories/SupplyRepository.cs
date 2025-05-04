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
    public class SupplyRepository : IRepository<Supply>
    {
        private JyskContext db;
        public SupplyRepository(JyskContext db)
        {
            this.db = db;
        }
        public async Task<IEnumerable<Supply>> GetAll(string sort = "IdAsc")
        {
            IQueryable<Supply>? arr = db.T_Supply.Include(o => o.Product);
            SortState sortstate = (SortState)Enum.Parse(typeof(SortState), sort);
            arr = sortstate switch
            {
                SortState.IdAsc => arr.OrderBy(s => s.Id),
                SortState.IdDesc => arr.OrderByDescending(s => s.Id),
                SortState.ProductAsc => arr.OrderBy(s => s.Product.Name),
                SortState.ProductDesc => arr.OrderByDescending(s => s.Product.Name),
                SortState.CountAsc => arr.OrderBy(s => s.Count),
                SortState.CountDesc => arr.OrderByDescending(s => s.Count),
                _ => arr.OrderBy(s => s.Id)
            };
            return await arr.ToListAsync();
        }
        public async Task<Supply> Get(int id)
        {
            var list = await db.T_Supply.Include(o => o.Product).Where(a => a.Id == id).ToListAsync();
            Supply supply = list.FirstOrDefault();
            if (supply == null)
            {
                Logger log = new Logger();
                log.Log("Error: Supply doesnt exist");
            }
            return supply;
        }
        public async Task Create(Supply supply)
        {
            try
            {
                await db.T_Supply.AddAsync(supply);
                Logger log = new Logger();
                log.Log("Supply added into database successfully");
            }
            catch (Exception ex)
            {
                Logger log = new Logger();
                log.Log("Error: Exception during adding supply into database\nException: " + ex.ToString());
            }
            
        }
        public void Update(Supply supply)
        {
            try
            {
                db.Entry(supply).State = EntityState.Modified;
                Logger log = new Logger();
                log.Log("Supply updated in database successfully");
            }
            catch (Exception ex)
            {
                Logger log = new Logger();
                log.Log("Error: Exception during updating supply in database\nException: " + ex.ToString());
            }
            
        }
        public async Task Delete(int id)
        {
            try
            {
                Supply supply = await db.T_Supply.FindAsync(id);
                if (supply != null)
                {
                    db.T_Supply.Remove(supply);
                }
                Logger log = new Logger();
                log.Log("Supply deleted from database successfully");
            }
            catch (Exception ex)
            {
                Logger log = new Logger();
                log.Log("Error: Exception during deleting supply from database\nException: " + ex.ToString());
            }
            
        }
    }
}
