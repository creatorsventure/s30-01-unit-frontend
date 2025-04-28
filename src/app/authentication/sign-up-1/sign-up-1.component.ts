import {Component} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {CRUDService} from '../../shared/services/crud.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ISignup} from './signup.model';
import {NzModalService} from 'ng-zorro-antd/modal';
import {TranslateService} from '@ngx-translate/core';
import {APP_NAVIGATION, LOCAL_STORAGE_KEYS} from '../../shared/routes/navigation.constant';
import {AlertService} from '../../shared/services/alert.service';
import {StorageService} from '../../shared/services/storage.service';


@Component({
    templateUrl: './sign-up-1.component.html',
    standalone: false
})

export class SignUp1Component {

    signUpForm: UntypedFormGroup;
    signupObj: ISignup;
    isSignup = false;
    isModelVisible = false;

    submitForm(): void {
        Object.keys(this.signUpForm.controls).forEach(controlName => {
            this.signUpForm.controls[controlName].markAsDirty();
            this.signUpForm.controls[controlName].updateValueAndValidity();
        });
        if (this.signUpForm.valid) {
            const tempObj = this.signUpForm.value;
            this.signupObj.password = tempObj.password;
            this.signupObj.confirmPassword = tempObj.confirmPassword;
            console.log(this.signupObj);
            this.crudService
                .post(APP_NAVIGATION.signup, this.signupObj)
                .subscribe({
                    error: (err) => {
                        this.alertService.alertHttpErrorResp(err, APP_NAVIGATION.signup);
                    },
                    complete: () => {
                        this.modal.success({
                            nzTitle: this.translate.instant('app.page.sign-up.signup-success-title'),
                            nzContent: this.translate.instant('app.page.sign-up.signup-success-hint'),
                            nzOnOk: () => this.handleOk(),
                            nzOnCancel: () => this.handleCancel()
                        });
                    },
                });
        }
    }

    updateConfirmValidator(): void {
        Promise.resolve().then(() => this.signUpForm.controls.confirmPassword.updateValueAndValidity());
    }

    confirmationValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return {required: true};
        } else if (control.value !== this.signUpForm.controls.password.value) {
            return {confirm: true, error: true};
        }
    };

    constructor(
        private modal: NzModalService,
        public router: Router,
        private route: ActivatedRoute,
        private fb: UntypedFormBuilder,
        private crudService: CRUDService,
        private translate: TranslateService,
        private storage: StorageService,
        private alertService: AlertService) {
    }

    ngOnInit(): void {
        this.signupObj = JSON.parse(this.storage.get(LOCAL_STORAGE_KEYS.SIGNUP_DATA));
        if (this.signupObj === null || this.signupObj === undefined) {
            this.alertService.error('app.message.failure.f005', true);
        } else {
            // this.storage.remove(LOCAL_STORAGE_KEYS.SIGNUP_DATA);
            // console.log('Received signupObj:', this.signupObj);
            this.isSignup = true;
            this.signUpForm = this.fb.group({
                name: [{value: this.signupObj.name, disabled: true}, [Validators.required]],
                entityCode: [{value: this.signupObj.entityCode, disabled: true}, [Validators.required]],
                entityName: [{value: this.signupObj.entityName, disabled: true}, [Validators.required]],
                userId: [{value: this.signupObj.userId, disabled: true}, [Validators.required]],
                email: [{value: this.signupObj.email, disabled: true}, [Validators.required]],
                mobileNumber: [{value: this.signupObj.mobileNumber, disabled: true}, [Validators.required]],
                password: [null, [Validators.required]],
                confirmPassword: [null, [Validators.required, this.confirmationValidator]],
                status: [this.signupObj.status]
            });
        }
    }

    redirectLoginPage(): void {
        this.router.navigate(['../'], {relativeTo: this.route, skipLocationChange: false});
    }

    handleOk(): void {
        this.isModelVisible = false;
        this.router.navigate(['../'], {relativeTo: this.route, skipLocationChange: false});
    }

    handleCancel(): void {
        this.isModelVisible = false;
    }
}
