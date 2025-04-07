using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jysk.DAL.Entities
{
    public class WriteOff
    {
        public int Id { get; set; }
        public string Date { get; set; }
        public virtual Employee EmployeeId { get; set; }
        public virtual Storage StorageId { get; set; }
        public virtual Product ProductId { get; set; }
        public string Reason { get; set; }
        public int Sum { get; set; }
    }
}
