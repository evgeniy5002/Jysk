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
    public class ClientRepository : IRepository<Client>
    {
        private JyskContext db;
        public ClientRepository(JyskContext db)
        {
            this.db = db;
        }
        public async Task<IEnumerable<Client>> GetAll()
        {
            return await db.T_Client.ToListAsync();
        }
        public async Task<Client> Get(int id)
        {
            Client client = await db.T_Client.FindAsync(id);
            return client;
        }
        public async Task Create(Client client)
        {
            await db.T_Client.AddAsync(client);
        }
        public void Update(Client client)
        {
            db.Entry(client).State = EntityState.Modified;
        }
        public async Task Delete(int id)
        {
            Client client = await db.T_Client.FindAsync(id);
            if (client != null)
            {
                db.T_Client.Remove(client);
            }
        }
    }
}
