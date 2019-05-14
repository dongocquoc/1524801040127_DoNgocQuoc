using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QLHocVien.Models
{
    [Table("SCORE_EXAM")]
    public class ScoreExam
    {
        [Column("SCORE_ID")]
        public int Id { get; set; }
        [Column("SUMSCORE")]
        public decimal SumScore { get; set; }
        [Column("SCOREPASS")]
        public decimal ScorePass { get; set; }

        public int EXAM_ID { get; set; }
        [ForeignKey("EXAM_ID")]
        public virtual ExamSubject ExamSubject { get; set; }
        public int MAJOR_ID { get; set; }
        [ForeignKey("MAJOR_ID")]
        public virtual Major Major { get; set; }
    }
}
