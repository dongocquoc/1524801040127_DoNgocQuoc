using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QLHocVien.Models
{
    [Table("CANDIDATETYPE")]
    public class CandidateType
    {
        [Column("TYPE_ID")]
        public int Id { get; set; }
        [Column("TYPENAME")]
        public string TypeName { get; set; }
    }
}
