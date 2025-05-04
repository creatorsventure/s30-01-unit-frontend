import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Injectable} from '@angular/core';
import {APP_NAVIGATION} from '../routes/navigation.constant';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {
    }

    canActivate(): boolean {
        if (this.authService.isLoggedIn()) {
            return true;
        } else {
            console.log('AuthGuard.canActivate failure, user is not logged in.');
            this.authService.logout();
            this.router.navigate([APP_NAVIGATION.authentication]);
            return false;
        }
    }
}
