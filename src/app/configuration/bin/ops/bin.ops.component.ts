import {Component, OnInit} from '@angular/core';
import {OpsAbstract} from '../../../shared/abstract/ops.abstract';
import {ActivatedRoute, Router} from '@angular/router';
import {CRUDService} from '../../../shared/services/crud.service';
import {FormBuilder} from '@angular/forms';
import {AppControlService} from '../../../shared/services/app.control.service';
import {AlertService} from '../../../shared/services/alert.service';
import {CONTROL_DESCRIPTION} from '../../../shared/constant/control.constant';
import {API_METHOD, APP_NAVIGATION} from '../../../shared/routes/navigation.constant';
import {binTypeOptions, instrumentTypeOptions} from '../../../shared/constant/unit.constant';

@Component({selector: 'app-bin-ops', templateUrl: './bin.ops.component.html', styles: [], standalone: false})
export class BinOpsComponent extends OpsAbstract implements OnInit {

    public schemeIdNameMap: Map<string, string>;
    public binTypeOptions: Map<number, string> = binTypeOptions;
    public instrumentTypeOptions: Map<number, string> = instrumentTypeOptions;

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
            schemeId: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.selectOne, this.object?.schemeId),
            type: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.selectOne, this.object?.type),
            instrumentType: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.selectOne, this.object?.instrumentType),
            start: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.numeric, this.object?.start),
            end: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.numeric, this.object?.end)
        });
        this.crudService.getData(APP_NAVIGATION.bin + API_METHOD.resolveOrgUnitScheme).subscribe(idNameMap => {
            // console.log('idNameMap: ', idNameMap);
            this.schemeIdNameMap = idNameMap;
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
