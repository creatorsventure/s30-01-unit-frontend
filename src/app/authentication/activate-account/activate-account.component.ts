import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {API_METHOD, APP_NAVIGATION, LOCAL_STORAGE_KEYS} from '../../shared/routes/navigation.constant';
import {CRUDService} from '../../shared/services/crud.service';
import {IVerifyOTP, IVerifySignup} from './activation.model';
import {AlertService} from '../../shared/services/alert.service';
import {StorageService} from '../../shared/services/storage.service';
import {ISignup} from '../sign-up-1/signup.model';


@Component({
    templateUrl: './activate-account.component.html',
    standalone: false
})
export class ActivateAccountComponent {

    isValidForm = false;
    verifySignup: IVerifySignup;
    payload: string;
    unitId: string;

    constructor(
        public router: Router,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private storage: StorageService,
        public crudService: CRUDService) {
    }

    ngOnInit(): void {
        this.storage.clearStorage();
        this.unitId = this.route.snapshot.paramMap.get('unitId');
        this.payload = this.route.snapshot.paramMap.get('payload');
        this.crudService.getData(APP_NAVIGATION.signup + API_METHOD.verifySignupMail,
            [{key: 'payload', value: this.payload}],
            [{key: 'X-UNIT-ID', value: this.unitId}]
        ).subscribe({
            next: (verifySignup: IVerifySignup) => {
                if (this.unitId === verifySignup.entityId) {
                    this.verifySignup = verifySignup;
                    this.isValidForm = true;
                } else {
                    this.alertService.error('app.message.failure.f003', true);
                    this.isValidForm = false;
                }
            },
            error: (err) => {
                // console.log(err);
                this.alertService.alertHttpErrorResp(err, APP_NAVIGATION.authentication);
                this.isValidForm = false;
            }
        });
    }

    validateOTP(): void {
        const verifyOTP: IVerifyOTP = {
            userId: this.verifySignup.adminUserId,
            unitId: this.verifySignup.entityId,
            otp: this.verifySignup.otp
        };
        this.crudService.post(APP_NAVIGATION.signup + API_METHOD.verifyOTP, verifyOTP, true,
            [{key: 'X-UNIT-ID', value: this.unitId}]
        ).subscribe({
            next: (status) => {
                this.isValidForm = true;
                // console.log('Status: ', status);
                if (status) {
                    const signupObj: ISignup = {
                        userId: this.verifySignup.adminUserId,
                        entityId: this.verifySignup.entityId,
                        entityCode: this.verifySignup.entityCode,
                        entityName: this.verifySignup.entityName,
                        password: '',
                        confirmPassword: '',
                        mobileNumber: this.verifySignup.adminMobileNumber,
                        countryCode: this.verifySignup.adminCountryCode,
                        email: this.verifySignup.adminEmail,
                        name: this.verifySignup.adminName,
                        description: this.verifySignup.entityName,
                        status: true
                    };
                    this.storage.store(LOCAL_STORAGE_KEYS.SIGNUP_DATA, JSON.stringify(signupObj));
                    this.router.navigate([APP_NAVIGATION.authentication + '/' + APP_NAVIGATION.signup]);
                } else {
                    this.alertService.error('app.message.failure.f004', true);
                }
            },
            error: (err) => {
                // console.log(err);
                this.alertService.alertHttpErrorResp(err, APP_NAVIGATION.authentication);
                this.isValidForm = false;
            }
        });
    }

    redirectLoginPage(): void {
        this.router.navigate([APP_NAVIGATION.authentication]);
    }
}
