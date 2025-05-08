import {Component, OnInit} from '@angular/core';
import {OpsAbstract} from '../../../shared/abstract/ops.abstract';
import {ActivatedRoute, Router} from '@angular/router';
import {CRUDService} from '../../../shared/services/crud.service';
import {FormBuilder} from '@angular/forms';
import {AppControlService} from '../../../shared/services/app.control.service';
import {AlertService} from '../../../shared/services/alert.service';
import {CONTROL_DESCRIPTION} from '../../../shared/constant/control.constant';
import {API_METHOD, APP_NAVIGATION} from '../../../shared/routes/navigation.constant';
import {merchantTypeOptions} from '../../../shared/constant/unit.constant';

@Component({selector: 'app-merchant-ops', templateUrl: './merchant.ops.component.html', styles: [], standalone: false})
export class MerchantOpsComponent extends OpsAbstract implements OnInit {
    public mccIdNameMap: Map<string, string>;
    merchantTypeOptions = merchantTypeOptions;

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
            merchantCode: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.code, this.object?.merchantCode),
            merchantId: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.code, this.object?.merchantId),
            legalName: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.input, this.object?.legalName),
            url: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.url, this.object?.url),
            merchantCategoryId: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.selectOne, this.object?.merchantCategoryId),
            bankIdentificationCode: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.input, this.object?.bankIdentificationCode),
            type: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.selectOne, this.object?.type),
            adminName: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.input, this.object?.adminName),
            adminEmail: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.email, this.object?.adminEmail),
            adminUserId: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.code, this.object?.adminUserId),
            adminMobileNumber: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.phone, this.object?.adminMobileNumber),
            adminCountryCode: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.phone, this.object?.adminCountryCode),
            address: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.inputSpecial, this.object?.address),
        });
        this.crudService.getData(APP_NAVIGATION.merchant + API_METHOD.resolveOrgMcc).subscribe(idNameMap => {
            this.mccIdNameMap = idNameMap;
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
