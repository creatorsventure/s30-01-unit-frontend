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
        if (userPermissions.includes(requiredPermission)) {
            // console.log('userPermissions: ', userPermissions);
            return true;
        } else {
            this.router.navigate([APP_NAVIGATION.error]);
        }
    }
}
