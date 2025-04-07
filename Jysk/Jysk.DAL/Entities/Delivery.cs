using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jysk.DAL.Entities
{
    public class Delivery
    {
        public int Id { get; set; }
        public Storage StorageId { get; set; }
        public string Date { get; set; }
        public string Comment { get; set; }
        public bool Status { get; set; }
        public int Sum { get; set; }
        public virtual Manufacturer ManufacturerId { get; set; }
    }
}
