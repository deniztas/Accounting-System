
import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {userService} from "../userService";

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private userService: userService, private router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(["/login"]);
      return false;
    } else {
      return true;
    }
  }
}
