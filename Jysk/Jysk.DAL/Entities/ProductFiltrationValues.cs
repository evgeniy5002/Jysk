using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jysk.DAL.Entities
{
    public class ProductFiltrationValues
    {
        public int[]? Price { get; set; }
        public bool? Delivery { get; set; }
        public string[]? Manufacturer { get; set; }
        public string[]? Category { get; set; }
        public bool? Discount { get; set; }
    }
}
