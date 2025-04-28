import {Component} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {CRUDService} from '../../shared/services/crud.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd/modal';
import {TranslateService} from '@ngx-translate/core';
import {API_METHOD, APP_NAVIGATION} from '../../shared/routes/navigation.constant';
import {IResetPassword} from './reset-password.model';


@Component({
    templateUrl: './reset-password.component.html',
    standalone: false
})

export class ResetPasswordComponent {

    resetPwdForm: UntypedFormGroup;
    resetPwdObj: IResetPassword;
    id: string;

    submitForm(): void {
        Object.keys(this.resetPwdForm.controls).forEach(controlName => {
            this.resetPwdForm.controls[controlName].markAsDirty();
            this.resetPwdForm.controls[controlName].updateValueAndValidity();
        });
        if (this.resetPwdForm.valid) {
            this.resetPwdObj = this.resetPwdForm.value;
            this.resetPwdObj.userDetailId = this.id;
            this.resetPwdObj.name = 'password-reset';
            // console.log(this.signupObj);
            this.crudService
                .post(APP_NAVIGATION.password + API_METHOD.resetPassword, this.resetPwdObj)
                .subscribe({
                    error: (err) => {
                        console.log(err);
                        this.modal.error({
                            nzTitle: this.translate.instant('app.page.login.signup-failure-title'),
                            nzContent: err?.error?.message ? this.translate.instant(err?.error?.message) : err.message,
                        });
                    },
                    complete: () => {
                        this.modal.success({
                            nzTitle: this.translate.instant('app.page.login.signup-success-title'),
                            nzContent: this.translate.instant('app.page.reset-password.success-hint'),
                            nzOnOk: () => this.redirectLoginPage()
                        });
                    },
                });
        }
    }

    confirmationValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return {required: true};
        } else if (control.value !== this.resetPwdForm.controls.password.value) {
            return {confirm: true, error: true};
        }
    };

    constructor(
        private modal: NzModalService,
        public router: Router,
        private route: ActivatedRoute,
        private fb: UntypedFormBuilder,
        private crudService: CRUDService,
        private translate: TranslateService) {
    }

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
        this.resetPwdForm = this.fb.group({
            password: [null, [Validators.required]],
            confirmPassword: [null, [Validators.required, this.confirmationValidator]],
        });
    }

    redirectLoginPage(): void {
        this.router.navigate([APP_NAVIGATION.authentication]);
    }
}
