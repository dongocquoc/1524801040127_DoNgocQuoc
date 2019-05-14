using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QLHocVien.Models
{
    [Table("CATALOG")]
    public class Catalog
    {

        [Column("CATALOG_ID")]
        public int Id { get; set; }
        [Column("BEGINYEAR")]
        public int BeginYear { get; set; }
        [Column("ENDYEAR")]
        public int EndYear { get; set; }

    }
}
