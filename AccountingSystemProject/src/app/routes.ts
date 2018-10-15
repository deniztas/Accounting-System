import {Routes} from '@angular/router'
import {AppComponent} from "./app.component";
import {UserComponent} from "./user/user.component";
import {HomeComponent} from "./home/home.component";
import {AddExpenseComponent} from "./add-expense/add-expense.component";
import {UpdateExpenseComponent} from "./update-expense/update-expense.component";
import {SignInComponent} from "./user/sign-in/sign-in.component";
import {SignUpComponent} from "./user/sign-up/sign-up.component";
import {LoggedInGuard} from "./user/auth/logged-in.guard";


export const appRoutes: Routes =[

  { path : 'home', component: HomeComponent ,canActivate: [LoggedInGuard]},
  { path : 'addExpense', component:AddExpenseComponent ,canActivate: [LoggedInGuard]},
  { path : 'updateExpense/:expense_id', component: UpdateExpenseComponent ,canActivate: [LoggedInGuard]},

  {
    path :  'signup', component: UserComponent,
    children: [{path: '', component:SignUpComponent}]
  },
  {
    path :  'login', component: UserComponent,
    children: [{path: '', component:SignInComponent}]
  },
  {path: '', redirectTo:'/login', pathMatch: 'full'}

];
