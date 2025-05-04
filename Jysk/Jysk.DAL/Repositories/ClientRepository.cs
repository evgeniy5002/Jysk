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
    public class ClientRepository : IRepository<Client>
    {
        private JyskContext db;
        public ClientRepository(JyskContext db)
        {
            this.db = db;
        }
        public async Task<IEnumerable<Client>> GetAll(string sort = "IdAsc")
        {
            IQueryable<Client>? arr = db.T_Client.Include(o => o.User);
            SortState sortstate = (SortState)Enum.Parse(typeof(SortState), sort);
            arr = sortstate switch
            {
                SortState.IdAsc => arr.OrderBy(s => s.Id),
                SortState.IdDesc => arr.OrderByDescending(s => s.Id),
                SortState.UserAsc => arr.OrderBy(s => s.User.Name),
                SortState.UserDesc => arr.OrderByDescending(s => s.User.Name),
                SortState.AddressAsc => arr.OrderBy(s => s.Address),
                SortState.AddressDesc => arr.OrderByDescending(s => s.Address),
                SortState.SumAsc => arr.OrderBy(s => s.Sum),
                SortState.SumDesc => arr.OrderByDescending(s => s.Sum),
                _ => arr.OrderBy(s => s.Id)
            };
            return await arr.ToListAsync();
        }
        public async Task<Client> Get(int id)
        {
            var list = await db.T_Client.Include(o => o.User).Where(a => a.Id == id).ToListAsync();
            Client client = list.FirstOrDefault();
            if (client == null)
            {
                Logger log = new Logger();
                log.Log("Error: Client doesnt exist");
            }
            return client;
        }
        public async Task Create(Client client)
        {
            try
            {
                await db.T_Client.AddAsync(client);
                Logger log = new Logger();
                log.Log("Client added into database successfully");
            }
            catch (Exception ex)
            {
                Logger log = new Logger();
                log.Log("Error: Exception during adding client into database\nException: " + ex.ToString());
            }
            
        }
        public void Update(Client client)
        {
            try
            {
                db.Entry(client).State = EntityState.Modified;
                Logger log = new Logger();
                log.Log("Client updated in database successfully");
            }
            catch (Exception ex)
            {
                Logger log = new Logger();
                log.Log("Error: Exception during updating client in database\nException: " + ex.ToString());
            }
            
        }
        public async Task Delete(int id)
        {
            try
            {
                Client client = await db.T_Client.FindAsync(id);
                if (client != null)
                {
                    db.T_Client.Remove(client);
                }
                Logger log = new Logger();
                log.Log("Client deleted from database successfully");
            }
            catch (Exception ex)
            {
                Logger log = new Logger();
                log.Log("Error: Exception during deleting client from database\nException: " + ex.ToString());
            }
        }
    }
}
