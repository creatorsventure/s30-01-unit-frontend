import {Component} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {IAuthInfo} from './auth-info.model';
import {API_METHOD, APP_NAVIGATION} from '../../shared/routes/navigation.constant';
import {Router} from '@angular/router';
import {CRUDService} from '../../shared/services/crud.service';
import {AuthService} from '../../shared/services/auth.service';
import {NzModalService} from 'ng-zorro-antd/modal';
import {TranslateService} from '@ngx-translate/core';
import {AlertService} from '../../shared/services/alert.service';
import {StorageService} from '../../shared/services/storage.service';


@Component({
    templateUrl: './login-2.component.html',
    standalone: false
})

export class Login2Component {
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
        const unitCode: string = this.loginForm.controls.unitCode.value;
        if (!userId || !unitCode) {
            this.modal.error({
                nzTitle: this.translate.instant('app.page.login.failure-title'),
                nzContent: this.translate.instant('app.message.failure.f006'),
            });
        } else {
            this.modal.warning({
                nzTitle: this.translate.instant('app.page.reset-password.reset-hint-1'),
                nzContent: this.translate.instant('app.page.reset-password.reset-hint-2'),
                nzOnOk: () => this.sendResetEmail(unitCode, userId)
            });
        }
    }

    sendResetEmail(unitCode: string, userId: string): void {
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
        private alertService: AlertService,
        private storage: StorageService
    ) {
    }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            unitCode: [null, [Validators.required]],
            userId: [null, [Validators.required]],
            password: [null, [Validators.required]],
        });
        this.storage.clearStorage();
    }
}
