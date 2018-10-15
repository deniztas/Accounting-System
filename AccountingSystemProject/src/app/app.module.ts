import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { RouterModule } from '@angular/router';
import {appRoutes} from "./routes";
import { UserComponent } from './user/user.component';
import {AddExpenseComponent} from "./add-expense/add-expense.component";
import { UpdateExpenseComponent } from './update-expense/update-expense.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ExpenseService} from "./home/expenseService";
import {SortPipe} from "./home/sortPipe";
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { userService } from  "./user/userService";
import {LoggedInGuard} from "./user/auth/logged-in.guard";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    AddExpenseComponent,
    UpdateExpenseComponent,
    SignInComponent,
    SignUpComponent,
    SortPipe,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)

  ],



  providers: [ExpenseService,userService, LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
