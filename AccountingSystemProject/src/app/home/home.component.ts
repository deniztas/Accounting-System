import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ExpenseService} from "./expenseService";
import {Router} from "@angular/router";
import {SignInComponent} from "../user/sign-in/sign-in.component";
import {userService} from "../user/userService";
import {reject} from "q";
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Between_Two_Dates } from './Expense.module';
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  })



export class HomeComponent implements OnInit {

  total_amount = 0;
    allExpenses: any;
    username:string;
    userFullName:string;
    sortedItems: any;
    betweenTwoDate: Between_Two_Dates;
    
  
    constructor(private router: Router,private expenseService: ExpenseService, private userService:userService) {
  }

  ngOnInit() {

    this.allExpenses = this.expenseService.listExpenses();
    
    this.allExpenses = this.expenseService.listExpenses();
      this.computeTotalAmount();
      this.username=localStorage.getItem("userName");
      this.onInitial();
      //this.allExpenses = this.allExpenses.sort((a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime());
      // debugger
  //      this.allExpenses = this.allExpenses.sort((a: any, b: any) =>
  //      new Date(a.date).getTime() - new Date(b.date).getTime()
  // );
    
  }
  onInitial(){
    this.betweenTwoDate ={
      fromDate:null,
      toDate:null,
    }
  }
  computeTotalAmount(){
    this.total_amount = 0;
    for (let entry of this.allExpenses) {

      this.total_amount += entry.expense_amount_TL;

    }
  }
    
  deleteExpense(expense_id){

    var result = this.expenseService.deleteExpense(expense_id)
        .subscribe((data) => {
            
          alert("Expense has been deleted successfully")
          this.ngOnInit();
        },
        error => {
          alert("Expense could not deleted. Error!");
          console.log(error);
          reject({error: error});
        });
  }

  addExpense(){

    if (this.userService.isLoggedIn())
      this.router.navigate(['/addExpense']);
    else
      this.router.navigate(['/login']);

  }
  betweenDates(form: NgForm){
    debugger
    console.log(form.value);
    this.expenseService.sendTwoDates(form.value)

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
    

}
