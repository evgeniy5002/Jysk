using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jysk.DAL.Entities
{
    public class Cargo
    {
        int Id { get; set; }
        public virtual Product ProductId { get; set; }
        public virtual Storage StorageToId { get; set; }
        public virtual Storage StorageFromId { get; set; }
        public int Count { get; set; }
        public virtual Employee EmployeeId { get; set; }
    }
}
