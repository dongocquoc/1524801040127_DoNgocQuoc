using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QLHocVien.Models
{
    [Table("PROVINCE")]
    public class Province
    {
        [Column("PROVINCE_ID")]
        public int Id { get; set; }
        [Column("PROVINCENAME")]
        public string ProvinceName { get; set; }
        public int COUNTRY_ID { get; set; }
        [ForeignKey("COUNTRY_ID")]
        public virtual Country Country { get; set; }
    }
}
