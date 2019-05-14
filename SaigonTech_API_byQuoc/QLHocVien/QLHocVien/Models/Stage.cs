using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QLHocVien.Models
{
    [Table("STAGE")]
    public class Stage
    {
        [Column("STAGE_ID")]
        public int Id { get; set; }
        [Column("STAGENAME")]
        public string StageName { get; set; }
        [Column("DATETIME")]
        public DateTime DateTimes { get; set; }
        [Column("EXAMDATE")]
        public DateTime ExamDate { get; set; }
        [Column("EXAMTIME")]
        public string ExamTime { get; set; }
        [Column("ENGLISHTIMEEXAM")]
        public string EnglishTimeExam { get; set; }
        public int SEM_ID { get; set; }
        [ForeignKey("SEM_ID")]
        public virtual Semester Semester { get; set; }
        public int YEAR_ID { get; set; }
        [ForeignKey("YEAR_ID")]
        public virtual Year Year { get; set; }
    }
}
