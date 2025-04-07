using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jysk.DAL.Entities
{
    public class Store
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int HouseNumber { get; set; }
        public int TotalProductSum { get; set; }
        public virtual Storage StorageId { get; set; }
        public string Photo { get; set; }
        public ICollection<WorkHours> WorkHoursId { get; set; }
    }
}
