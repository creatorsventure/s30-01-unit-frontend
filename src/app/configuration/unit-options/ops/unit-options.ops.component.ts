import {Component, OnInit} from '@angular/core';
import {OpsAbstract} from '../../../shared/abstract/ops.abstract';
import {ActivatedRoute, Router} from '@angular/router';
import {CRUDService} from '../../../shared/services/crud.service';
import {FormBuilder} from '@angular/forms';
import {AppControlService} from '../../../shared/services/app.control.service';
import {AlertService} from '../../../shared/services/alert.service';
import {CONTROL_DESCRIPTION} from '../../../shared/constant/control.constant';

@Component({selector: 'app-unitOptions-ops', templateUrl: './unit-options.ops.component.html', styles: [], standalone: false})
export class UnitOptionsOpsComponent extends OpsAbstract implements OnInit {
    isEnforced = false;

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
            partial: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.switch, this.object?.partial),
            allowExcess: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.switch, this.object?.allowExcess),
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
