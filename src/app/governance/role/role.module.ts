import {NgModule} from '@angular/core';
import {RoleIndexComponent} from './index/role.index.component';
import {RoleListComponent} from './list/role.list.component';
import {RoleOpsComponent} from './ops/role.ops.component';
import {RoleRouteModule} from './route/role.route.module';
import {SharedModule} from '../../shared/shared.module';
import {NzTreeModule} from 'ng-zorro-antd/tree';

@NgModule({
    declarations: [RoleIndexComponent, RoleListComponent, RoleOpsComponent],
    imports: [
        SharedModule,
        RoleRouteModule,
        NzTreeModule
    ]
})
export class RoleModule {
}
