import { Component, OnInit } from '@angular/core';
import {ExpenseService} from "../home/expenseService";
import {HomeComponent} from "../home/home.component";
import {ActivatedRoute, Data, Params, Router} from "@angular/router";
import {ANY_STATE} from "@angular/animations/browser/src/dsl/animation_transition_expr";
import {NgForm} from "@angular/forms";
import {reject} from "q";
import {Expense_insert_module, Expense_update_module} from "../home/Expense.module";

@Component({
  selector: 'app-update-expense',
  templateUrl: './update-expense.component.html',
  styleUrls: ['./update-expense.component.css']
})
export class UpdateExpenseComponent implements OnInit {
  expense_id=0;
  selectedExpense: any;
    updated_expense_id:0;
    username:string;

  constructor(private router: ActivatedRoute,private  expenseService: ExpenseService, private routes: Router) { }

  ngOnInit() {
      this.initialForm();
      this.username=localStorage.getItem("userName");


    this.router.queryParams.subscribe((params: Params) => {
        this.expense_id = params['expense_id'];        // id yi ?expense_id=12 şeklinde url den alır
        console.log(this.expense_id);
      });

    this.router.params.subscribe(params => {
      this.expense_id=params['expense_id'];               // id yi /12 şeklinde url den alır
      console.log(params) //log the entire params object
      console.log(params['expense_id']) //log the value of id
    });


    this.expenseService.getSelectedExpenseForUpdate(this.expense_id).subscribe(data=>{
      console.log(data);
      this.selectedExpense=data
    });

  }

  initialForm(){

    this.selectedExpense={
      expense_id:0,
      expense_name: '',
      expense_amount_TL: null,
      expense_amount_dollar:null,
      expense_date: null,
      expense_explaination:'',
      whose_expense_name:''
    }
  }



  SubmitUpdate(form:NgForm){

    this.updated_expense_id=this.selectedExpense.expense_id;

    this.expenseService.updateExpense(form.value, this.updated_expense_id)
      .subscribe((data) => {
          alert("Expense has been updated successfully")
        },
        error => {
          alert("Expense could not update. Error!");
          console.log(error);
          reject({error: error});
        });

  }
    Logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    this.routes.navigate(['/login']);

  }

}
