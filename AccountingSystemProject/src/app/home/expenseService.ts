import {Component, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Expense_insert_module, Expense_module, Expense_update_module, Between_Two_Dates} from "./Expense.module";
import {ValidationErrors} from "@angular/forms";
import {observable} from "rxjs/internal-compatibility";
import {Observable} from "rxjs/internal/Observable";
import {userService} from "../user/userService";
import {ResponseType} from "@angular/http";
import {Router} from "@angular/router";
import {ExpressionCallMetadataWalker} from "codelyzer/noForwardRefRule";

@Injectable()

export class ExpenseService {
  readonly rootUrl = 'http://localhost:17822';
  email_cookie= localStorage.getItem("email");
  password_cookie=localStorage.getItem("password");

  constructor(private http: HttpClient, private userService: userService, private router:Router) {
  }

 listExpenses(){


   if(this.userService.isLoggedIn()) {

     var reqHeader = new HttpHeaders();
     reqHeader= reqHeader.append("email", this.email_cookie);
     reqHeader= reqHeader.append("password", this.password_cookie);

     console.log(reqHeader);

     console.log(reqHeader.keys());
     console.log(reqHeader.get('Access-Control-Allow-Methods'));
     var result = this.http.get(this.rootUrl + '/Expense', {headers: reqHeader, withCredentials: true});
     console.log(result)

     return result;
   }
   else
     this.router.navigate(["/login"]);

 }


  insertExpense(expense: Expense_insert_module) {

    if (this.userService.isLoggedIn()) {
      const body: Expense_insert_module = {
        expense_name: expense.expense_name,
        expense_amount_TL: expense.expense_amount_TL,
        expense_amount_dollar: expense.expense_amount_dollar,
        expense_explaination: expense.expense_explaination,
        expense_date: expense.expense_date,
        whose_expense_name: expense.whose_expense_name
        }
      

      var reqHeader = new HttpHeaders();
      reqHeader= reqHeader.append("email", this.email_cookie);
      reqHeader= reqHeader.append("password", this.password_cookie);

        var result = this.http.post(this.rootUrl + '/Expense', body, {headers: reqHeader});
      return result;
    }
    else
      this.router.navigate(["/login"]);
  }

  sendTwoDates(dates: Between_Two_Dates){
    const body: Between_Two_Dates= {
      fromDate:dates.fromDate,
      toDate:dates.toDate
    }
    debugger
    var reqHeader = new HttpHeaders();
      reqHeader= reqHeader.append("email", this.email_cookie);
      reqHeader= reqHeader.append("password", this.password_cookie);
      console.log(this.rootUrl + '/Expense/dates');

      var result = this.http.post(this.rootUrl + '/Expense/dates', body, {headers: reqHeader});
      return result;
  }

  deleteExpense(expense_id)
    {
      if(this.userService.isLoggedIn()) {

        var reqHeader = new HttpHeaders();
        reqHeader= reqHeader.append("email", this.email_cookie);
        reqHeader= reqHeader.append("password", this.password_cookie);

        var params = new HttpParams();
        params = params.append("deleted_expense_id", expense_id);
        var result = this.http.delete(this.rootUrl + '/Expense', {headers: reqHeader, params: params});
        return result;
      }
      else
        this.router.navigate(["/login"]);

  }



  getSelectedExpenseForUpdate(expense_id: number) {
    if (this.userService.isLoggedIn()) {

      var reqHeader = new HttpHeaders();
      /*reqHeader= reqHeader.append("email", this.email_cookie);
      reqHeader= reqHeader.append("password", this.password_cookie);*/

      var params = new HttpParams();
      var result = this.http.get(this.rootUrl + '/Expense/' + expense_id.toString(expense_id),
        {headers: reqHeader, withCredentials: true});

      console.log(this.rootUrl + '/Expense/' + expense_id);
      console.log(result)
      return result;
    }
    else
      this.router.navigate(["/login"]);
  }

  updateExpense(expense: Expense_update_module, updatedExpenseId:number){

    if(this.userService.isLoggedIn()) {

      const body: Expense_update_module = {
        expense_id: updatedExpenseId,
        expense_name: expense.expense_name,
        expense_amount_TL: expense.expense_amount_TL,
        expense_amount_dollar: expense.expense_amount_dollar,
        expense_explaination: expense.expense_explaination,
        expense_date: expense.expense_date,
        whose_expense_name: expense.whose_expense_name
      }

      var reqHeader = new HttpHeaders();
      reqHeader= reqHeader.append("email", this.email_cookie);
      reqHeader= reqHeader.append("password", this.password_cookie);

      var result = this.http.put(this.rootUrl + '/Expense', body, {headers: reqHeader});

      return result;
    }
    else
      this.router.navigate(["/login"]);
  }
  

}
