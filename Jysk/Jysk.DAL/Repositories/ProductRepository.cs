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
    public class ProductRepository : IRepository<Product>
    {
        private JyskContext db;
        public ProductRepository(JyskContext db)
        {
            this.db = db;
        }
        public async Task<IEnumerable<Product>> GetAll(string sort = "IdAsc")
        {
            IQueryable<Product>? arr = db.T_Product.Include(o => o.Manufacturer).Include(o => o.Category);
            SortState sortstate = (SortState)Enum.Parse(typeof(SortState), sort);
            arr = sortstate switch
            {
                SortState.IdAsc => arr.OrderBy(s => s.Id),
                SortState.IdDesc => arr.OrderByDescending(s => s.Id),
                SortState.NameAsc => arr.OrderBy(s => s.Name),
                SortState.NameDesc => arr.OrderByDescending(s => s.Name),
                SortState.PriceAsc => arr.OrderBy(s => s.Price),
                SortState.PriceDesc => arr.OrderByDescending(s => s.Price),
                SortState.ManufacturerAsc => arr.OrderBy(s => s.Manufacturer.Name),
                SortState.ManufacturerDesc => arr.OrderByDescending(s => s.Manufacturer.Name),
                SortState.RatingAsc => arr.OrderBy(s => s.Rating),
                SortState.RatingDesc => arr.OrderByDescending(s => s.Rating),
                SortState.DescriptionAsc => arr.OrderBy(s => s.Description),
                SortState.DescriptionDesc => arr.OrderByDescending(s => s.Description),
                SortState.DeliveryAsc => arr.OrderBy(s => s.Delivery),
                SortState.DeliveryDesc => arr.OrderByDescending(s => s.Delivery),
                SortState.CategoryAsc => arr.OrderBy(s => s.Category.Name),
                SortState.CategoryDesc => arr.OrderByDescending(s => s.Category.Name),
                SortState.DiscountAsc => arr.OrderBy(s => s.Discount),
                SortState.DiscountDesc => arr.OrderByDescending(s => s.Discount),
                SortState.PhotoAsc => arr.OrderBy(s => s.Photo),
                SortState.PhotoDesc => arr.OrderByDescending(s => s.Photo),
                _ => arr.OrderBy(s => s.Id)
            };
            return await arr.ToListAsync();
        }
        public async Task<Product> Get(int id)
        {
            var list = await db.T_Product.Include(o => o.Manufacturer).Include(o => o.Category).Where(a => a.Id == id).ToListAsync();
            Product product = list.FirstOrDefault();
            if (product == null)
            {
                Logger log = new Logger();
                log.Log("Error: Product doesnt exist");
            }
            return product;
        }
        public async Task Create(Product product)
        {
            try
            {
                await db.T_Product.AddAsync(product);
                Logger log = new Logger();
                log.Log("Product added into database successfully");
            }
            catch (Exception ex)
            {
                Logger log = new Logger();
                log.Log("Error: Exception during adding product into database\nException: " + ex.ToString());
            }
            
        }
        public void Update(Product product)
        {
            try
            {
                db.Entry(product).State = EntityState.Modified;
                Logger log = new Logger();
                log.Log("Product updated in database successfully");
            }
            catch (Exception ex)
            {
                Logger log = new Logger();
                log.Log("Error: Exception during updating product in database\nException: " + ex.ToString());
            }
            
        }
        public async Task Delete(int id)
        {
            try
            {
                Product product = await db.T_Product.FindAsync(id);
                if (product != null)
                {
                    db.T_Product.Remove(product);
                }
                Logger log = new Logger();
                log.Log("Product deleted from database successfully");
            }
            catch (Exception ex)
            {
                Logger log = new Logger();
                log.Log("Error: Exception during deleting product from database\nException: " + ex.ToString());
            }
            
        }
    }
}
