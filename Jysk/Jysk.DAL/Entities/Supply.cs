using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jysk.DAL.Entities
{
    public class Supply
    {
        public int Id { get; set; }
        public virtual Product ProductId { get; set; }
        public int Count { get; set; }
    }
}
