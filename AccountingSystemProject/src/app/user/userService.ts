import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { User } from './User.module';
import {Observable} from "rxjs/internal/Observable";
import {Expense_update_module} from "../home/Expense.module";
import {loginUserModel} from "./loginUserModel";
import {Router} from "@angular/router";
import { map } from 'rxjs/operators';
import "rxjs-compat/add/operator/map";


@Injectable()

export class userService {
    loggedIn:boolean;


  readonly rootUrl = 'http://localhost:17822';
  constructor(private http: HttpClient, private router:Router) {
    this.loggedIn = !!localStorage.getItem('email');

  }

  postLoginInformations(email,password){

    const body: loginUserModel={
      email:email,
      password:password
    }

    var result = this.http.post(this.rootUrl + "/Login", body ).map((res: any) => {

      if (res) {
        localStorage.setItem('email',res.email);
        localStorage.setItem('password',res.password);
        localStorage.setItem('userName',res.user_name);
        localStorage.setItem('userSurname',res.user_surname);

        this.loggedIn = true;
      }

      return res;
    });

    return result;
  }

  isLoggedIn() {

    return localStorage.getItem('email') != null && localStorage.getItem('password') != null;
  }

}
