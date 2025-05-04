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
    public class CargoRepository : IRepository<Cargo>
    {
        private JyskContext db;
        public CargoRepository(JyskContext db)
        {
            this.db = db;
        }
        public async Task<IEnumerable<Cargo>> GetAll(string sort = "IdAsc")
        {
            IQueryable<Cargo>? arr = db.T_Cargo.Include(o => o.Product).Include(o => o.StorageFrom).Include(o => o.StorageTo).Include(o => o.Employee).Include(o => o.Employee.User);
            SortState sortstate = (SortState)Enum.Parse(typeof(SortState), sort);
            arr = sortstate switch
            {
                SortState.IdAsc => arr.OrderBy(s => s.Id),
                SortState.IdDesc => arr.OrderByDescending(s => s.Id),
                SortState.ProductAsc => arr.OrderBy(s => s.Product.Name),
                SortState.ProductDesc => arr.OrderByDescending(s => s.Product.Name),
                SortState.CountAsc => arr.OrderBy(s => s.Count),
                SortState.CountDesc => arr.OrderByDescending(s => s.Count),
                SortState.StorageToAsc => arr.OrderBy(s => s.StorageTo.Name),
                SortState.StorageToDesc => arr.OrderByDescending(s => s.StorageTo.Name),
                SortState.StorageFromAsc => arr.OrderBy(s => s.StorageFrom.Name),
                SortState.StorageFromDesc => arr.OrderByDescending(s => s.StorageFrom.Name),
                SortState.EmployeeAsc => arr.OrderBy(s => s.Employee.User.Name),
                SortState.EmployeeDesc => arr.OrderByDescending(s => s.Employee.User.Name),
                _ => arr.OrderBy(s => s.Id)
            };
            return await arr.ToListAsync();
        }
        public async Task<Cargo> Get(int id)
        {
            var list = await db.T_Cargo.Include(o => o.Product).Include(o => o.StorageFrom).Include(o => o.StorageTo).Include(o => o.Employee).Include(o => o.Employee.User).Where(a => a.Id == id).ToListAsync();
            Cargo cargo = list.FirstOrDefault();
            if (cargo == null)
            {
                Logger log = new Logger();
                log.Log("Error: Cargo doesnt exist");
            }
            return cargo;
        }
        public async Task Create(Cargo cargo)
        {
            try
            {
                await db.T_Cargo.AddAsync(cargo);
                Logger log = new Logger();
                log.Log("Cargo added into database successfully");
            }
            catch (Exception ex)
            {
                Logger log = new Logger();
                log.Log("Error: Exception during adding cargo into database\nException: " + ex.ToString());
            }
        }
        public void Update(Cargo cargo)
        {
            try
            {
                db.Entry(cargo).State = EntityState.Modified;
                Logger log = new Logger();
                log.Log("Cargo updated in database successfully");
            }
            catch (Exception ex)
            {
                Logger log = new Logger();
                log.Log("Error: Exception during updating cargo in database\nException: " + ex.ToString());
            }
        }
        public async Task Delete(int id)
        {
            try
            {
                Cargo cargo = await db.T_Cargo.FindAsync(id);
                if (cargo != null)
                {
                    db.T_Cargo.Remove(cargo);
                }
                Logger log = new Logger();
                log.Log("Cargo deleted from database successfully");
            }
            catch (Exception ex)
            {
                Logger log = new Logger();
                log.Log("Error: Exception during deleting cargo from database\nException: " + ex.ToString());
            }
        }
    }
}
