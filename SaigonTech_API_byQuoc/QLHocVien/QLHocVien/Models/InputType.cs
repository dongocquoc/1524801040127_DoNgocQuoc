using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QLHocVien.Models
{
    [Table("INPUTTYPE")]
    public class InputType
    {
        [Column("Input_ID")]
        public int Id { get; set; }
        [Column("InputName")]
        public string InputName { get; set; }
    }
}
