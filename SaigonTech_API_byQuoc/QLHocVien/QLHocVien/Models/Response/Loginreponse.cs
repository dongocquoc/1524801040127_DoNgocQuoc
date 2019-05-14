using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QLHocVien.Models.Response
{
    public class Loginreponse
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string token { get; set; }
    }
}
