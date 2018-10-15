import { Component, OnInit } from '@angular/core';
import {userService} from "../userService";
import {any} from "codelyzer/util/function";
import {Router} from "@angular/router";
import {Observable} from "rxjs/internal/Observable";
import {reject} from "q";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  isLoginError : boolean = false;
  model: any = {};
  error:string;
    // loggedIn:boolean;
    username:string;
    usersurname:string;

  constructor(private UserSevice:userService, private router:Router) {
  }

  ngOnInit() {
  }

  submitLogin(email,password) {

    console.log(email + " " + password);

      this.UserSevice.postLoginInformations(email, password).subscribe((data:any) => {
     
        this.router.navigate(["/home"]);

      },
      error => {
        alert("Email or password is incorrect");
        console.log(error);
        reject({error: error});
      });

  }





}
