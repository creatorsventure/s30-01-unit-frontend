import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Injectable} from '@angular/core';
import {APP_NAVIGATION} from '../routes/navigation.constant';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class PermissionGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        const requiredPermission = route.data.crudOps as string;
        const userPermissions = this.authService.getPermissions();
        // console.log('userPermissions: ', userPermissions, 'requiredPermission: ', requiredPermission);
        if (userPermissions.includes(requiredPermission)) {
            return true;
        } else {
            console.log('PermissionGuard.canActivate failure, user do not have the necessary permissions.');
            this.router.navigate([APP_NAVIGATION.error]);
        }
    }
}
