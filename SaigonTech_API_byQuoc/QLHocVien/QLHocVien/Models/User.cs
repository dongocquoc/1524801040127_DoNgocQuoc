using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QLHocVien.Models
{
    [Table("Users")]
    public class User
    {
        [Column("Use_ID")]
        public int Id { get; set; }
        public string Name { get; set; }
        public Nullable<int> Phone { get; set; }
        public string Addres { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string PassWord { get; set; }
        public Nullable<int> Status { get; set; }
        public string ImagePath { get; set; }
        [NotMapped]
        public IFormFile File { get; set; }
  }
}
