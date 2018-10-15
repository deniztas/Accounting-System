using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AccountingSystemProject.Entity;
using Microsoft.AspNetCore.Mvc;
using AccountingSystemProject.Models;
using AccountingSystemProject.Objects;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AccountingSystemProject.Controllers
{
  [AllowCrossSiteJson]
  [Route("[controller]")]
    public class ExpenseController : Controller
    {
        // GET: /<controller>/

        [HttpPost]
        public IActionResult InsertExpense([FromBody]ExpenseInsertViewModel newExpense)
        {
            using (var context = new EntityContext())
            {
              if (!Request.Headers.ContainsKey("email")&&!Request.Headers.ContainsKey("email"))
              {
                return Unauthorized();
              }
        if(!(CheckUser(Request.Headers["email"], Request.Headers["password"])))
              {
                return Unauthorized();
              }  
                //The line below clears and resets the databse.
                //context.Database.EnsureDeleted();

                // Create the database if it does not exist
                context.Database.EnsureCreated();
                User loggedUser = getLoggedUser(Request.Headers["email"], Request.Headers["password"]);

                // Add some video games.
                //Note that the Id field is autoincremented by default
                var expense = new Expense();
                expense.expense_name = newExpense.expense_name;
                expense.expense_amount_TL = newExpense.expense_amount_TL;
                expense.expense_amount_dollar = newExpense.expense_amount_dollar;
                expense.expense_date = newExpense.expense_date;
                expense.expense_explaination = newExpense.expense_explaination;
                expense.whose_expense_name = newExpense.whose_expense_name;
                expense.record_created_date = DateTime.Now;
                expense.record_created_by_id = loggedUser.user_id;
                //throw new Exception("Test Hatası");
                context.Expense.Add(expense);
                context.SaveChanges();



                return Json(expense);

            }
        }

        [HttpDelete]
        public IActionResult RemoveExpense(int deleted_expense_id)
        {
         

         using (var context = new EntityContext())
         {
          if (!Request.Headers.ContainsKey("email") && !Request.Headers.ContainsKey("email"))
          {
            return Unauthorized();
          }
        if (!(CheckUser(Request.Headers["email"], Request.Headers["password"])))
              {
                return Unauthorized();
              } 
            context.Database.EnsureCreated();
            var expense = new Expense();

        //  var remove_expense_query = from expns in context.Expense where expns.expense_id == deleted_expense_id select expns; 
            var remove_expense_query = context.Expense.FirstOrDefault(x => x.expense_id == deleted_expense_id);

            if(remove_expense_query!=null){   
              context.RemoveRange(remove_expense_query);
              context.SaveChanges();
              
             }
            return Json(remove_expense_query);
                
            }
        }

        [HttpPut]
        public IActionResult UpdateExpense([FromBody]Expense expense)
        {
            using (var context = new EntityContext())
            {
              if (!Request.Headers.ContainsKey("email")&&!Request.Headers.ContainsKey("email"))
              {
                return Unauthorized();
              }
        if (!(CheckUser(Request.Headers["email"], Request.Headers["password"])))
              {
                return Unauthorized();
              } 
                var update_expense_query = context.Expense.SingleOrDefault(c => c.expense_id == expense.expense_id);

                if (update_expense_query != null)
                {
                    update_expense_query.expense_name = expense.expense_name;
                    update_expense_query.expense_amount_TL = expense.expense_amount_TL;
                    update_expense_query.expense_amount_dollar = expense.expense_amount_dollar;
                    update_expense_query.expense_date = expense.expense_date;
                    update_expense_query.expense_explaination = expense.expense_explaination;
                    update_expense_query.whose_expense_name = expense.whose_expense_name;
                    update_expense_query.record_created_date = expense.record_created_date;
                }
                context.SaveChanges();
              return Json(update_expense_query);
            }
        
        }
      [HttpGet]
      public IActionResult ListExpense()
      {
        using (var context = new EntityContext())
        {
          /*if (!Request.Headers.ContainsKey("email")&&!Request.Headers.ContainsKey("email"))
          {
            return Unauthorized();
          }
        if (!(CheckUser(Request.Headers["email"], Request.Headers["password"])))
         {
          return Unauthorized();
         } */
        var expenseViewModel = new ExpenseInsertViewModel();

       /* var recordCreatedUser = (from a in context.Expense
                                 join b in context.Users on a.record_created_by_id equals b.user_id
                                 select new { a, b.user_name, b.user_surname });
              */

        return Json(context.Expense.OrderByDescending(x => x.expense_date).ToList());
        }
      }



      [HttpOptions]
      public IActionResult test()
      {
        return Ok();
      }

      [HttpGet]
      [Route("{get_expense_by_id:int}")]
      public IActionResult getExpenseById(int get_expense_by_id)
      {

        using (var context = new EntityContext())
        {
         /* if (!Request.Headers.ContainsKey("email")&&!Request.Headers.ContainsKey("email"))
          {
            return Unauthorized();
          }
        if (!(CheckUser(Request.Headers["email"], Request.Headers["password"])))
         {
          return Unauthorized();
        }*/
          return Json(context.Expense.FirstOrDefault(x=>x.expense_id == get_expense_by_id));
        }
      }
      [HttpPost]
      [Route("dates")]
      public IActionResult getExpensesBetweenTwoDate([FromBody]DateViewModel date){
        using (var context = new EntityContext())
      {
            var filteredData=context.Expense.Where(t => t.expense_date > date.fromDate && t.expense_date < date.toDate).FirstOrDefault();
            if(filteredData!=null)
              return Json(filteredData);
            return new EmptyResult();
            
      }
      }

        public Boolean CheckUser(string email, string password)
    {
      using (var context = new EntityContext())
      {
        var myUser = context.Users.FirstOrDefault
              (u => u.email.Equals(email) && u.password.Equals(password));
        if (myUser != null)
        {
          return true;
        }
        else
          return false;
      }
    
    }
    public User getLoggedUser(string email, string password)
    {
      using (var context = new EntityContext())
      {
        var myUser = context.Users.FirstOrDefault
              (u => u.email.Equals(email) && u.password.Equals(password));
        if (myUser != null)
        {
          return myUser;
        }
        return null;
      }

    }

    


  }

}
