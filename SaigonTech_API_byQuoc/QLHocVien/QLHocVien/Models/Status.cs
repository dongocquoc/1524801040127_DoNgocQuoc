using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QLHocVien.Models
{
    [Table("STATUSS")]
    public class Status
    {
        [Column("Status_ID")]
        public int Id { get; set; }
        [Column("StatusName")]
        public string StatusName { get; set; }
    }
}
