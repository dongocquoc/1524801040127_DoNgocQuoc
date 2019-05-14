using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QLHocVien.Models
{
    [Table("INTAKE")]
    public class Intake
    {
        [Column("INTAKE_ID")]
        public int Id { get; set; }
        [Column("INTAKENAME")]
        public string IntakeName { get; set; }
    }
}
