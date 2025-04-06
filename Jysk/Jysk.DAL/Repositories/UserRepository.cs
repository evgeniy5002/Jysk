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
    public class UserRepository : IRepository<User>
    {
        private JyskContext db;
        public UserRepository(JyskContext db)
        {
            this.db = db;
        }
        public async Task<IEnumerable<User>> GetAll()
        {
            return await db.T_User.ToListAsync();
        }
        public async Task<User> Get(int id)
        {
            User user = await db.T_User.FindAsync(id);
            return user;
        }
        public async Task Create(User user)
        {
            await db.T_User.AddAsync(user);
        }
        public void Update(User user)
        {
            db.Entry(user).State = EntityState.Modified;
        }
        public async Task Delete(int id)
        {
            User user = await db.T_User.FindAsync(id);
            if (user != null)
            {
                db.T_User.Remove(user);
            }
        }
    }
}
