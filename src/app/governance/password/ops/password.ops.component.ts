import {Component, OnInit} from '@angular/core';
import {OpsAbstract} from '../../../shared/abstract/ops.abstract';
import {ActivatedRoute, Router} from '@angular/router';
import {CRUDService} from '../../../shared/services/crud.service';
import {FormBuilder} from '@angular/forms';
import {AppControlService} from '../../../shared/services/app.control.service';
import {AlertService} from '../../../shared/services/alert.service';
import {LOCAL_STORAGE_KEYS} from '../../../shared/routes/navigation.constant';
import {CONTROL_DESCRIPTION} from '../../../shared/constant/control.constant';
import {IPassword} from '../model/password.model.component';
import {StorageService} from '../../../shared/services/storage.service';
import {IAuthInfo} from '../../../authentication/login-2/auth-info.model';

@Component({selector: 'app-password-ops', templateUrl: './password.ops.component.html', styles: [], standalone: false})
export class PasswordOpsComponent extends OpsAbstract implements OnInit {

    constructor(
        public override fb: FormBuilder,
        public override activatedRoute: ActivatedRoute,
        public override crudService: CRUDService,
        public override appCtrlService: AppControlService,
        public override alertService: AlertService,
        private storage: StorageService,
        public override router: Router) {
        super(fb, activatedRoute, crudService, appCtrlService, alertService, router);
    }

    ngOnInit(): void {
        super.init();
        this.crudForm = this.fb.group({
            password: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.password, this.object?.password),
            confirmPassword: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.password, this.object?.confirmPassword),
        });
    }

    public customCreateOrUpdate(): void {
        const passwordObj: IPassword = this.crudForm.value;
        const authInfo: IAuthInfo = this.storage.get(LOCAL_STORAGE_KEYS.AUTH_INFO);
        passwordObj.name = authInfo.name;
        passwordObj.userDetailId = authInfo.userId;
        this.createOrUpdate(passwordObj);
    }

    override customUpdateValidations(): boolean {
        return true;
    }

    override customCreateValidations(): boolean {
        return true;
    }

    override customPostSuccessOps(): void {
    }

    override customPostFailureOps(): void {
    }
}
