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
        public async Task<IEnumerable<Client>> GetAll()
        {
            return await db.T_Client.ToListAsync();
        }
        public async Task<Client> Get(int id)
        {
            Client client = await db.T_Client.FindAsync(id);
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
                Cargo cargo = await db.T_Cargo.FindAsync(id);
                if (cargo != null)
                {
                    db.T_Cargo.Remove(cargo);
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
