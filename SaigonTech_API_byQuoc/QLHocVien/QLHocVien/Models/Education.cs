using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QLHocVien.Models
{
    [Table("EDUCATION")]
    public class Education
    {
        [Column("EDUCATION_ID")]
        public int Id { get; set; }
        [Column("EDUCATIONNAME")]
        public string EducationName { get; set; }
    }
}
