import { Component, OnInit } from '@angular/core';
import {Expense_insert_module} from "../home/Expense.module";
import {NgForm} from "@angular/forms";
import {reject} from "q";
import {Router} from "@angular/router";
import {ExpenseService} from "../home/expenseService";



@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {
    expense: Expense_insert_module;
    username:string;

  constructor(private router: Router,private expenseService:ExpenseService) {

  }

  ngOnInit() {
      this.resetForm();
      this.username=localStorage.getItem("userName");

  }

  resetForm(form?: NgForm){
    if (form!=null)
      form.reset();
    this.expense={
      expense_name: '',
      expense_amount_TL: null,
      expense_amount_dollar:null,
      expense_date: null,
      expense_explaination:'',
      whose_expense_name:''
    }
  }


  insertExpense(form: NgForm){

    console.log(form.value);
    this.expenseService.insertExpense(form.value)

        .subscribe((data) => {
            
            this.router.navigate(["/home"]);
          //alert("Expense has been added successfully")
          
      },
        error => {
        alert("Expense could not added. Error!");
          console.log(error);
          reject({error: error});
        });

  }
    Logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    this.router.navigate(['/login']);

    }
    numberOnly(event): boolean {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;


  }



}


