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

namespace Jysk.DAL.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        bool UserExists(string email, string password);
        Task<User> GetEmail(string email);
    }

}
