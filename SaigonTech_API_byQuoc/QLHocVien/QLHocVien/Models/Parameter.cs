using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QLHocVien.Models
{
  [Table("PARAMETER")]
  public class Parameter
  {
    [Column("PARAMETER_ID")]
    public int Id { get; set; }


    [Column("SIGNATURENAME")]
    public string Singaturename { get; set; }

    [Column("MORECONTACT")]
    public string Morecontact { get; set; }

    [Column("DOCUMENTCODE")]
    public string Documentcode { get; set; }

    [Column("YEAR_ID")]
    public int yearid { get; set; }
    [ForeignKey("yearid")]
    public virtual Year Year { get; set; }

    [Column("SEM_ID")]
    public int semid { get; set; }
    [ForeignKey("semid")]
    public virtual Semester Semeter { get; set; }

    [Column("INTAKE_ID")]
    public int intakeid { get; set; }
    [ForeignKey("intakeid")]
    public virtual Intake Intake { get; set; }
  }
}
