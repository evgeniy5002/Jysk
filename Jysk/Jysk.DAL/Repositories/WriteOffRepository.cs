﻿using System;
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
    public class WriteOffRepository : IRepository<WriteOff>
    {
        private JyskContext db;
        public WriteOffRepository(JyskContext db)
        {
            this.db = db;
        }
        public async Task<IEnumerable<WriteOff>> GetAll(string sort = "IdAsc")
        {
            IQueryable<WriteOff>? arr = db.T_WriteOff.Include(o => o.Employee).Include(o => o.Employee.User).Include(o => o.Product).Include(o => o.Storage);
            SortState sortstate = (SortState)Enum.Parse(typeof(SortState), sort);
            arr = sortstate switch
            {
                SortState.IdAsc => arr.OrderBy(s => s.Id),
                SortState.IdDesc => arr.OrderByDescending(s => s.Id),
                SortState.ProductAsc => arr.OrderBy(s => s.Product.Name),
                SortState.ProductDesc => arr.OrderByDescending(s => s.Product.Name),
                SortState.DateAsc => arr.OrderBy(s => s.Date),
                SortState.DateDesc => arr.OrderByDescending(s => s.Date),
                SortState.EmployeeAsc => arr.OrderBy(s => s.Employee.User.Name),
                SortState.EmployeeDesc => arr.OrderByDescending(s => s.Employee.User.Name),
                _ => arr.OrderBy(s => s.Id)
            };
            return await arr.ToListAsync();
        }
        public async Task<WriteOff> Get(int id)
        {
            var list = await db.T_WriteOff.Include(o => o.Employee).Include(o => o.Employee.User).Include(o => o.Product).Include(o => o.Storage).Where(a => a.Id == id).ToListAsync();
            WriteOff writeOff = list.FirstOrDefault();
            if (writeOff == null)
            {
                Logger log = new Logger();
                log.Log("Error: WriteOff doesnt exist");
            }
            return writeOff;
        }
        public async Task Create(WriteOff writeOff)
        {
            try
            {
                await db.T_WriteOff.AddAsync(writeOff);
                Logger log = new Logger();
                log.Log("WriteOff added into database successfully");
            }
            catch (Exception ex)
            {
                Logger log = new Logger();
                log.Log("Error: Exception during adding WriteOff into database\nException: " + ex.ToString());
            }
            
        }
        public void Update(WriteOff writeOff)
        {
            try
            {
                db.Entry(writeOff).State = EntityState.Modified;
                Logger log = new Logger();
                log.Log("WriteOff updated in database successfully");
            }
            catch (Exception ex)
            {
                Logger log = new Logger();
                log.Log("Error: Exception during updating WriteOff in database\nException: " + ex.ToString());
            }
        }
        public async Task Delete(int id)
        {
            try
            {
                WriteOff writeOff = await db.T_WriteOff.FindAsync(id);
                if (writeOff != null)
                {
                    db.T_WriteOff.Remove(writeOff);
                }
                Logger log = new Logger();
                log.Log("WriteOff deleted from database successfully");
            }
            catch (Exception ex)
            {
                Logger log = new Logger();
                log.Log("Error: Exception during deleting WriteOff from database\nException: " + ex.ToString());
            }
            
        }
    }
}
