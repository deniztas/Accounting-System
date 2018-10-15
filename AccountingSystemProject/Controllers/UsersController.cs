using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AccountingSystemProject.Entity;
using Microsoft.AspNetCore.Mvc;
using AccountingSystemProject.Models;


// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AccountingSystemProject.Controllers
{
    public class UsersController : Controller
    {
        // GET: /<controller>/
        [HttpPost]
        public IActionResult InsertUser([FromBody]User newUser)
        {
            
                //The line below clears and resets the databse.
            //context.Database.EnsureDeleted();
            using (var context = new EntityContext())
            {
                // Create the database if it does not exist
            
                context.Database.EnsureCreated();

                // Add some video games. 
                //Note that the Id field is autoincremented by default
                var usr = new User();
                usr.user_name = newUser.user_name;
                usr.user_surname = newUser.user_surname;
                usr.email = newUser.email;
                usr.password = newUser.password;
                context.Users.Add(usr);
                context.SaveChanges();



                return Json(context.Users.ToList());
            }
        }


    }

}
