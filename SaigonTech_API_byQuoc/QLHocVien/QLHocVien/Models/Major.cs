using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QLHocVien.Models
{
    [Table("MAJOR")]
    public class Major
    {
        [Column("MAJOR_ID")]
        public int Id { get; set; }
        [Column("MAJOR_NAME")]
        public string MajorName { get; set; }
    }
}
