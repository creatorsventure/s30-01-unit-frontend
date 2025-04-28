import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {APP_NAVIGATION} from '../../shared/routes/navigation.constant';
import {AuthService} from '../../shared/services/auth.service';

@Component({
    templateUrl: './error-1.component.html',
    standalone: false
})

export class Error1Component implements OnInit {
    constructor(private router: Router, private authService: AuthService) {
    }

    ngOnInit(): void {
        this.authService.logout();
    }

    redirectLogin(): void {
        this.router.navigate([APP_NAVIGATION.authentication]);
    }
}
