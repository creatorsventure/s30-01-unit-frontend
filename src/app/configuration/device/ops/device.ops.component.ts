import {Component, OnInit} from '@angular/core';
import {OpsAbstract} from '../../../shared/abstract/ops.abstract';
import {ActivatedRoute, Router} from '@angular/router';
import {CRUDService} from '../../../shared/services/crud.service';
import {FormBuilder} from '@angular/forms';
import {AppControlService} from '../../../shared/services/app.control.service';
import {AlertService} from '../../../shared/services/alert.service';
import {API_METHOD, APP_NAVIGATION} from '../../../shared/routes/navigation.constant';
import {CONTROL_DESCRIPTION} from '../../../shared/constant/control.constant';

@Component({selector: 'app-device-ops', templateUrl: './device.ops.component.html', styles: [], standalone: false})
export class DeviceOpsComponent extends OpsAbstract implements OnInit {
    public merchantIdNameMap: Map<string, string>;
    public unitOptionsIdNameMap: Map<string, string>;
    public unitKeyIdNameMap: Map<string, string>;
    public unitIdNameMaps: Map<string, Map<string, string>> | undefined;


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
            selectedMerchantId: this.appCtrlService.generateFormControl(
                CONTROL_DESCRIPTION.selectOne, this.object?.selectedMerchantId),
            selectedUnitOptionsId: this.appCtrlService.generateFormControl(
                CONTROL_DESCRIPTION.selectOne, this.object?.selectedUnitOptionsId),
            selectedUnitKeyId: this.appCtrlService.generateFormControl(
                CONTROL_DESCRIPTION.selectOne, this.object?.selectedUnitKeyId),
            engineList: this.appCtrlService.generateFormControl(
                CONTROL_DESCRIPTION.selectMany, this.object?.engineList),
            currencyList: this.appCtrlService.generateFormControl(
                CONTROL_DESCRIPTION.selectMany, this.object?.currencyList),
            schemeList: this.appCtrlService.generateFormControl(
                CONTROL_DESCRIPTION.selectMany, this.object?.schemeList),
            actionList: this.appCtrlService.generateFormControl(
                CONTROL_DESCRIPTION.selectMany, this.object?.actionList),
        });
        this.crudService.getData(APP_NAVIGATION.merchant + API_METHOD.idNameMap).subscribe(idNameMap => {
            this.merchantIdNameMap = idNameMap;
        });
        this.crudService.getData(APP_NAVIGATION.unitOptions + API_METHOD.idNameMap).subscribe(idNameMap => {
            this.unitOptionsIdNameMap = idNameMap;
        });
        this.crudService.getData(APP_NAVIGATION.unitKey + API_METHOD.idNameMap).subscribe(idNameMap => {
            this.unitKeyIdNameMap = idNameMap;
        });
        this.crudService.getData(APP_NAVIGATION.device + API_METHOD.resolveOrgUnitIdNameMaps).subscribe(response => {
            const raw = response.idNameMaps;
            // console.log('idNameMaps: ', raw);
            const converted: [string, Map<string, string>][] = Object.entries(raw).map(
                ([outerKey, innerObj]) => [outerKey, new Map(Object.entries(innerObj))]
            );
            this.unitIdNameMaps = new Map<string, Map<string, string>>(converted);
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
