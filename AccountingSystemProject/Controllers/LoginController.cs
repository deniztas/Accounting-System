using System;
using System.Collections.Generic;
using System.Linq;
using AccountingSystemProject.Entity;
using AccountingSystemProject.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Web;


// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AccountingSystemProject.Controllers
{

  [AllowCrossSiteJson]
  [Route("[controller]")]
  public class LoginController : Controller
  {

    // GET: /<controller>/
      [HttpPost]
      public IActionResult ValidateLoginInfo([FromBody] LoginUser user)
      {
        using (var context = new EntityContext())
        {
        //  HttpCookie loginCookie = new HttpCookie("UserCookie");
          var myUser = context.Users.FirstOrDefault
            (u => u.email.Equals(user.email) && u.password.Equals(user.password));

          if (myUser != null)
          {
            return Json(myUser);
          }
          return Unauthorized();
        }
      }


    [HttpOptions]
    public IActionResult test()
    {
      return Ok();
    }







}


}
