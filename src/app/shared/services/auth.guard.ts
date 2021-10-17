import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/login-page'], { state: { redirectTo: state.url } });
      return false;
    }
    const userRole = this.authService.user?.Role;
    if (route.data.role && route.data.role.indexOf(userRole) === -1) {
      this.router.navigate(['/login-page'], { state: { redirectTo: state.url } });
      return false;
    }
    return true;
  }
}
