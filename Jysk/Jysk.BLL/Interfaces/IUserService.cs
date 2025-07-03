using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Jysk.BLL.DTO;

namespace Jysk.BLL.Interfaces
{
    public interface IUserService
    {
        Task Create(UserDTO entity);
        Task Update(UserDTO entity);
        Task Delete(int id);
        Task<UserDTO> GetById(int id);
        Task<IEnumerable<UserDTO>> GetAll(string sort);
        bool CheckUser(string email, string password);
        Task<UserDTO> GetByEmail(string email);
    }
}
