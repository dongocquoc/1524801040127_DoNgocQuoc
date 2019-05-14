using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QLHocVien.Models
{
    [Table("DOCUMENT")]
    public class Document
    {
        [Column("DOC_ID")]
        public int Id { get; set; }
        [Column("NAMEINENGLISH")]
        public string NameInEnglish { get; set; }
        [Column("NAMEINVIETNAMESE")]
        public string NameInVietnamese { get; set; }
        [Column("SEQUENCENUM")]
        public int SequenceNumber { get; set; }
        public int INPUTTYPE { get; set; }
        [ForeignKey("INPUTTYPE")]
        public virtual InputType InputTypes { get; set; }
        public int STATUS { get; set; }
        [ForeignKey("STATUS")]
        public virtual Status Statuss { get; set; }
        [Column("NOTE")]
        public string Note { get; set; }
    }
}
