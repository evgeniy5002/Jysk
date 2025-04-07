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
    public class WorkHoursRepository : IRepository<WorkHours>
    {
        private JyskContext db;
        public WorkHoursRepository(JyskContext db)
        {
            this.db = db;
        }
        public async Task<IEnumerable<WorkHours>> GetAll()
        {
            return await db.T_WorkHours.ToListAsync();
        }
        public async Task<WorkHours> Get(int id)
        {
            WorkHours workHours = await db.T_WorkHours.FindAsync(id);
            return workHours;
        }
        public async Task Create(WorkHours workHours)
        {
            await db.T_WorkHours.AddAsync(workHours);
        }
        public void Update(WorkHours workHours)
        {
            db.Entry(workHours).State = EntityState.Modified;
        }
        public async Task Delete(int id)
        {
            WorkHours workHours = await db.T_WorkHours.FindAsync(id);
            if (workHours != null)
            {
                db.T_WorkHours.Remove(workHours);
            }
        }
    }
}
