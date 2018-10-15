using System;
using System.ComponentModel.DataAnnotations;

namespace AccountingSystemProject.Models
{
    public class User
    {
        [Key]
        public int user_id { get; set; }
        public string user_name { get; set; }
        public string user_surname { get; set; }
        public string email { get; set; }
        public string password { get; set; }


    }
}

