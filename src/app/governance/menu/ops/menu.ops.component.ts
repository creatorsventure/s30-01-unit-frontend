import {Component, OnInit} from '@angular/core';
import {OpsAbstract} from '../../../shared/abstract/ops.abstract';
import {ActivatedRoute, Router} from '@angular/router';
import {CRUDService} from '../../../shared/services/crud.service';
import {FormBuilder} from '@angular/forms';
import {AppControlService} from '../../../shared/services/app.control.service';
import {AlertService} from '../../../shared/services/alert.service';
import {CONTROL_DESCRIPTION} from '../../../shared/constant/control.constant';
import {API_METHOD, APP_NAVIGATION} from '../../../shared/routes/navigation.constant';
import {constIconThemeOptions, constIconTypeOptions, constMenuTypeOptions} from '../../../shared/constant/org.constant';

@Component({
    selector: 'app-menu-ops',
    templateUrl: 'menu.ops.component.html',
    standalone: false
})
export class MenuOpsComponent extends OpsAbstract implements OnInit {

    public iconTypeOptions: Map<string, string> = constIconTypeOptions;
    public iconThemeOptions: Map<string, string> = constIconThemeOptions;
    public menuTypeOptions: Map<number, string> = constMenuTypeOptions;
    public moduleIdNameMap: Map<string, string>;

    constructor(
        public override fb: FormBuilder,
        public override activatedRoute: ActivatedRoute,
        public override crudService: CRUDService,
        public override appCtrlService: AppControlService,
        public override alertService: AlertService,
        public override router: Router
    ) {
        super(fb, activatedRoute, crudService, appCtrlService, alertService, router);
    }

    ngOnInit(): void {
        super.init();
        this.crudForm = this.fb.group({
            path: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.inputSpecial, this.object?.path),
            icon: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.input, this.object?.icon),
            iconType: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.selectOne, this.object?.iconType),
            iconTheme: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.selectOne, this.object?.iconTheme),
            rootMenuId: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.inputSpecial, this.object?.rootMenuId),
            displayPosition: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.numeric, this.object?.displayPosition),
            menuType: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.selectOne, this.object?.menuType),
            dashboardCountCard: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.switch, this.object?.dashboardCountCard),
            // moduleId: this.appCtrlService.generateFormControl(CONTROL_DESCRIPTION.selectOne, this.object?.moduleId),
        });
        this.crudService.getData(APP_NAVIGATION.organization + API_METHOD.idNameMap).subscribe(idNameMap => {
            this.moduleIdNameMap = idNameMap;
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
