using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jysk.DAL.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public virtual Product ProductId { get; set; }
        public int Count { get; set; }
        public int ProductionPrice { get; set; }
        public int FinalPrice { get; set; }
        public int MarkUp { get; set; }
        public virtual User UserId { get; set; }
    }
}
