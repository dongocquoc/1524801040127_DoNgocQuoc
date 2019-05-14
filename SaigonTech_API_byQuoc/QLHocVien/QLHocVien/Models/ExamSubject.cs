using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QLHocVien.Models
{
    [Table("EXAMSUBJECT")]
    public class ExamSubject
    {
        [Column("EXAM_ID")]
        public int Id { get; set; }
        [Column("EXAMNAME")]
        public string ExamName { get; set; }
        public int MAJOR_ID { get; set; }
        [ForeignKey("MAJOR_ID")]
        public virtual Major Major { get; set; }
    }
}
