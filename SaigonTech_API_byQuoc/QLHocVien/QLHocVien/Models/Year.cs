using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QLHocVien.Models
{
    [Table("YEAR")]
    public class Year
    {
        [Column("YEAR_ID")]
        public int Id { get; set; }
        [Column("YEARNAME")]
        public int YearName { get; set; }
    }
}
