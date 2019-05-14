using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QLHocVien.Models
{
    [Table("CANDIDATEDOCUMENT")]
    public class CandidateDocument
    {
        [Column("ID_NOTE")]
        public int Id { get; set; }
        [Column("NOTE")]
        public string Note { get; set; }
        public int DOC_ID { get; set; }
        [ForeignKey("DOC_ID")]
        public virtual Document Document { get; set; }
        public int C_ID { get; set; }
        [ForeignKey("C_ID")]
        public virtual Candidate Candidate { get; set; }
    }
}
