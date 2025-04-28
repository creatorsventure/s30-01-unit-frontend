import {Component} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {CRUDService} from '../../shared/services/crud.service';
import {API_METHOD, APP_NAVIGATION} from '../../shared/routes/navigation.constant';
import {IAuthInfo} from './auth-info.model';
import {NzModalService} from 'ng-zorro-antd/modal';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {AlertService} from '../../shared/services/alert.service';

@Component({
    templateUrl: './login-1.component.html',
    standalone: false
})
export class Login1Component {
    loginForm: UntypedFormGroup;
    isSignup = false;
    authInfo: IAuthInfo;

    submitForm(): void {
        Object.keys(this.loginForm.controls).forEach(controlName => {
            this.loginForm.controls[controlName].markAsDirty();
            this.loginForm.controls[controlName].updateValueAndValidity();
        });
        if (this.loginForm.valid) {
            this.authInfo = this.loginForm.value;
            this.authService.login(this.authInfo)
                .subscribe({
                    error: (err) => {
                        // console.log('login error: ', err);
                        this.alertService.alertHttpErrorResp(err, APP_NAVIGATION.authentication);
                    },
                    complete: () => {
                        this.router.navigateByUrl('/refresh', {skipLocationChange: true}).then(() => {
                            this.router.navigate([APP_NAVIGATION.dashboard]);
                        });
                        // this.router.navigate([APP_NAVIGATION.dashboard]);
                    },
                });
        }
    }

    forgotPassword(): void {
        const userId: string = this.loginForm.controls.userId.value;
        if (!userId) {
            this.modal.error({
                nzTitle: this.translate.instant('app.page.login.failure-title'),
                nzContent: this.translate.instant('app.message.failure.022'),
            });
        } else {
            this.modal.warning({
                nzTitle: this.translate.instant('app.page.reset-password.reset-hint-1'),
                nzContent: this.translate.instant('app.page.reset-password.reset-hint-2'),
                nzOnOk: () => this.sendResetEmail(userId)
            });
        }
    }

    sendResetEmail(userId: string): void {
        this.crudService.getData(APP_NAVIGATION.password + API_METHOD.forgotPassword,
            [{key: 'userId', value: userId}])
            .subscribe(status => {
                if (Boolean(status)) {
                    this.modal.success({
                        nzTitle: this.translate.instant('app.page.login.success-title'),
                        nzContent: this.translate.instant('app.page.login.success-hint'),
                    });
                }
            });
    }

    constructor(
        private router: Router,
        private fb: UntypedFormBuilder,
        public crudService: CRUDService,
        public authService: AuthService,
        private modal: NzModalService,
        private translate: TranslateService,
        private alertService: AlertService
    ) {
    }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            userId: [null, [Validators.required]],
            password: [null, [Validators.required]],
        });
    }
}
