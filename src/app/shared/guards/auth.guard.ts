import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from '../user/user.service'


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: UserService) {
    }

    canActivate(routeSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.authService.isAuthenticated) {
            console.log('redirect to login')
            this.router.navigate(['/login']);
        }  
        return true;
    }
}