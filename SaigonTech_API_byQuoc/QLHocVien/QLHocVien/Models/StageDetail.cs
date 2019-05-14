using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QLHocVien.Models
{
    [Table("STAGEDETAILS")]
    public class StageDetail
    {
        [Column("STAGE_DETAILS_ID")]
        public int Id { get; set; }
        [Column("STAR_TIME")]
        public string StarTime { get; set; }
        [Column("END_TIME")]
        public string EndTime { get; set; }

        public string Interview { get; set; }

        public int Major_ID { get; set; }
        [ForeignKey("Major_ID")]
        public virtual Major Major { get; set; }

        public int Stage_ID { get; set; }
        [ForeignKey("Stage_ID")]
        public virtual Stage Stage { get; set; }

        public int Exam_ID { get; set; }
        [ForeignKey("Exam_ID")]
        public virtual ExamSubject ExamSubject { get; set; }
    }
}
