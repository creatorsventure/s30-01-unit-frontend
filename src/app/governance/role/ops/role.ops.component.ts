import {Component, OnInit} from '@angular/core';
import {OpsAbstract} from '../../../shared/abstract/ops.abstract';
import {ActivatedRoute, Router} from '@angular/router';
import {CRUDService} from '../../../shared/services/crud.service';
import {FormBuilder} from '@angular/forms';
import {AppControlService} from '../../../shared/services/app.control.service';
import {AlertService} from '../../../shared/services/alert.service';
import {API_METHOD, APP_NAVIGATION} from '../../../shared/routes/navigation.constant';
import {CONTROL_DESCRIPTION} from '../../../shared/constant/control.constant';
import {NzFormatEmitEvent, NzTreeNodeOptions} from 'ng-zorro-antd/tree';
import {IRole} from '../model/role.model.component';
import {updateFormDirtyAndValueAndValidity} from '../../../shared/utils/utils';

@Component({selector: 'app-role-ops', templateUrl: './role.ops.component.html', styles: [], standalone: false})
export class RoleOpsComponent extends OpsAbstract implements OnInit {
    public organizationIdNameMap: Map<string, string>;
    public permissionIdNameMap: Map<string, string>;

    menuTree: NzTreeNodeOptions[];
    checkedKeys: any[];
    selectedMenuIds: any[] = [];

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
            organizationId: this.appCtrlService.generateFormControl(
                CONTROL_DESCRIPTION.selectOne, this.object?.organizationId),
            selectedPermissionIds: this.appCtrlService.generateFormControl(
                CONTROL_DESCRIPTION.selectMany, this.object?.selectedPermissionIds),
        });
        this.crudService.getData(APP_NAVIGATION.organization + API_METHOD.idNameMap).subscribe(idNameMap => {
            this.organizationIdNameMap = idNameMap;
        });
        this.crudService.getData(APP_NAVIGATION.permission + API_METHOD.idNameMap).subscribe(idNameMap => {
            this.permissionIdNameMap = idNameMap;
        });
        this.getMenus();
    }

    customCreateOrUpdate(): void {
        updateFormDirtyAndValueAndValidity(this.crudForm);
        if (this.crudForm.valid) {
            if (this.selectedMenuIds === undefined || this.selectedMenuIds.length === 0) {
                this.alertService.error('app.message.failure.f002', true);
            } else {
                const role: IRole = this.crudForm.value;
                role.selectedMenuIds = this.selectedMenuIds;
                this.createOrUpdate(role);
            }
        }
    }

    nzEvent(event: NzFormatEmitEvent): void {
        this.selectedMenuIds = event.keys;
    }

    getMenus(): void {
        this.crudService.getData(
            APP_NAVIGATION.menu + API_METHOD.menuTree
        ).subscribe(tree => {
            if (tree && ((this.crudOps === this.permissions.edit) || (this.crudOps === this.permissions.view))
                && this.object?.selectedMenuIds?.length) {
                const idSet = new Set(this.object.selectedMenuIds);
                this.checkedKeys = this.object?.selectedMenuIds;
                this.selectedMenuIds = this.object?.selectedMenuIds;
                for (const node of tree) {
                    node.checked = idSet.has(node.key);
                }
            }
            this.menuTree = tree;
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
