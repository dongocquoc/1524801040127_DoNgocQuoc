using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QLHocVien.Models
{
    [Table("DISTRICT")]
    public class District
    {
        [Column("DISTRICT_ID")]
        public int Id { get; set; }
        [Column("DISTRICTNAME")]
        public string DistrictName { get; set; }
        public int PROVINCE_ID { get; set; }
        [ForeignKey("PROVINCE_ID")]
        public virtual Province Province { get; set; }
    }
}
