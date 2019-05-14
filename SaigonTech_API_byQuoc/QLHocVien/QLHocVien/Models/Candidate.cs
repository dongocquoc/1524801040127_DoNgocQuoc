using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QLHocVien.Models
{
    [Table("CANDIDATE")]
    public class Candidate
    {
        [Column("C_ID")]
        public int Id { get; set; }
        [Column("CANDIDATE_ID")]
        public string CandidateId { get; set; }
        [Column("LASTNAME")]
        public string LastName { get; set; }
        [Column("FIRSTNAME")]
        public string FirstName { get; set; }
        [Column("BIRTHDAY")]
        public DateTime DateOfBirth { get; set; }
        [Column("GENDER")]
        public int Gender { get; set; }
        [Column("PHONENUMBER")]
        public string Phone { get; set; }
        [Column("HOMEADDRESS")]
        public string HomeAddress { get; set; }
        [Column("COUNTRY")]
        public string CountryAddress { get; set; }
        [Column("PROVINCE")]
        public string ProvinceAddress { get; set; }
        [Column("DISTRICT")]
        public string DistrictAddress { get; set; }
        [Column("PLACEOFBIRTH")]
        public string PlaceOfBirth { get; set; }
        [Column("MARITALSTATUS")]
        public int MaritalStatus { get; set; }
        [Column("HIGHSCHOOLNAME")]
        public string HighSchoolName { get; set; }
        [Column("HIGHSCHOOLCITY")]
        public string HighSchoolCity { get; set; }
        [Column("GRADUATEYEAR")]
        public int GraduateYear { get; set; }
        [Column("REGISTRYDATE")]
        public DateTime RegistryDate { get; set; }
        [Column("EMAIL")]
        public string Email { get; set; }
        [Column("IDCARD")]
        public string CardId { get; set; }
        [Column("FINALRESULT")]
        public bool FinalResult { get; set; }
        [Column("DOCUMENTCODE")]
        public string DocumentCode { get; set; }
        public int STAGE_ID { get; set; }
        [ForeignKey("STAGE_ID")]
        public virtual Stage Stage { get; set; }
        public int MAJOR_ID { get; set; }
        [ForeignKey("MAJOR_ID")]
        public virtual Major Major { get; set; }
        public int CATALOG_ID { get; set; }
        [ForeignKey("CATALOG_ID")]
        public virtual Catalog Catalog { get; set; }
        public int COUNTRY_ID { get; set; }
        [ForeignKey("COUNTRY_ID")]
        public virtual Country Country { get; set; }
        public int EDUCATION_ID { get; set; }
        [ForeignKey("EDUCATION_ID")]
        public virtual Education Education { get; set; }
        public int YEAR_ID { get; set; }
        [ForeignKey("YEAR_ID")]
        public virtual Year Year { get; set; }
        public int TYPE_ID { get; set; }
        [ForeignKey("TYPE_ID")]
        public virtual CandidateType CandidateType { get; set; }
        public int INTAKE_ID { get; set; }
        [ForeignKey("INTAKE_ID")]
        public virtual Intake Intake { get; set; }
        public int SEM_ID { get; set; }
        [ForeignKey("SEM_ID")]
        public virtual Semester Semester { get; set; }
    }
}
