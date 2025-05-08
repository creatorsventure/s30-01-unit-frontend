import {Component, OnInit} from '@angular/core';
import {OpsAbstract} from '../../../shared/abstract/ops.abstract';
import {ActivatedRoute, Router} from '@angular/router';
import {CRUDService} from '../../../shared/services/crud.service';
import {FormBuilder} from '@angular/forms';
import {AppControlService} from '../../../shared/services/app.control.service';
import {AlertService} from '../../../shared/services/alert.service';
import {CONTROL_DESCRIPTION} from '../../../shared/constant/control.constant';

@Component({selector: 'app-unitKey-ops', templateUrl: './unit-key.ops.component.html', styles: [], standalone: false})
export class UnitKeyOpsComponent extends OpsAbstract implements OnInit {
    constructor(public override fb: FormBuilder,
                public override activatedRoute: ActivatedRoute,
                public override crudService: CRUDService,
                public override appCtrlService: AppControlService,
                public override alertService: AlertService,
                public override router: Router) {
        super(fb, activatedRoute, crudService, appCtrlService, alertService, router);
    }

    ngOnInit(): void {
        super.init();
        this.crudForm = this.fb.group({
            commonName: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.code, this.object?.commonName),
            organization: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.code, this.object?.organization),
            organizationalUnit: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.code, this.object?.organizationalUnit),
            locality: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.code, this.object?.locality),
            state: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.code, this.object?.state),
            country: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.code, this.object?.country),
            email: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.email, this.object?.email),
            validityYears: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.numeric, this.object?.validityYears),
            unitPrivateKeyPassword: this.appCtrlService.generateFormControl(
                CONTROL_DESCRIPTION.password, this.object?.unitPrivateKeyPassword)
        });
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
