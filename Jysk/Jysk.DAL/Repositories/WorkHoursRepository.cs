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
    public class WorkHoursRepository : IRepository<WorkHours>
    {
        private JyskContext db;
        public WorkHoursRepository(JyskContext db)
        {
            this.db = db;
        }
        public async Task<IEnumerable<WorkHours>> GetAll(string sort = "IdAsc")
        {
            IQueryable<WorkHours>? arr = db.T_WorkHours;
            SortState sortstate = (SortState)Enum.Parse(typeof(SortState), sort);
            arr = sortstate switch
            {
                SortState.IdAsc => arr.OrderBy(s => s.Id),
                SortState.IdDesc => arr.OrderByDescending(s => s.Id),
                SortState.NameAsc => arr.OrderBy(s => s.Day),
                SortState.NameDesc => arr.OrderByDescending(s => s.Day),
                SortState.StartAsc => arr.OrderBy(s => s.Start),
                SortState.EndAsc => arr.OrderBy(s => s.End),
                SortState.StartDesc => arr.OrderByDescending(s => s.Start),
                SortState.EndDesc => arr.OrderByDescending(s => s.End),
                _ => arr.OrderBy(s => s.Id)
            };
            return await arr.ToListAsync();
        }
        public async Task<WorkHours> Get(int id)
        {
            WorkHours workHours = await db.T_WorkHours.FindAsync(id);
            if (workHours == null)
            {
                Logger log = new Logger();
                log.Log("Error: WorkHours doesnt exist");
            }
            return workHours;
        }
        public async Task Create(WorkHours workHours)
        {
            try
            {
                await db.T_WorkHours.AddAsync(workHours);
                Logger log = new Logger();
                log.Log("WorkHours added into database successfully");
            }
            catch (Exception ex)
            {
                Logger log = new Logger();
                log.Log("Error: Exception during adding WorkHours into database\nException: " + ex.ToString());
            }
            
        }
        public void Update(WorkHours workHours)
        {
            try
            {
                db.Entry(workHours).State = EntityState.Modified;
                Logger log = new Logger();
                log.Log("WorkHours updated in database successfully");
            }
            catch (Exception ex)
            {
                Logger log = new Logger();
                log.Log("Error: Exception during updating WorkHours in database\nException: " + ex.ToString());
            }
            
        }
        public async Task Delete(int id)
        {
            try
            {
                WorkHours workHours = await db.T_WorkHours.FindAsync(id);
                if (workHours != null)
                {
                    db.T_WorkHours.Remove(workHours);
                }
                Logger log = new Logger();
                log.Log("WorkHours deleted from database successfully");
            }
            catch (Exception ex)
            {
                Logger log = new Logger();
                log.Log("Error: Exception during deleting WorkHours from database\nException: " + ex.ToString());
            }
            
        }
    }
}
