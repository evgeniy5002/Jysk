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
    public class EmployeeRepository : IRepository<Employee>
    {
        private JyskContext db;
        public EmployeeRepository(JyskContext db)
        {
            this.db = db;
        }
        public async Task<IEnumerable<Employee>> GetAll()
        {
            return await db.T_Employee.ToListAsync();
        }
        public async Task<Employee> Get(int id)
        {
            Employee employee = await db.T_Employee.FindAsync(id);
            return employee;
        }
        public async Task Create(Employee employee)
        {
            await db.T_Employee.AddAsync(employee);
        }
        public void Update(Employee employee)
        {
            db.Entry(employee).State = EntityState.Modified;
        }
        public async Task Delete(int id)
        {
            Employee employee = await db.T_Employee.FindAsync(id);
            if (employee != null)
            {
                db.T_Employee.Remove(employee);
            }
        }
    }
}
