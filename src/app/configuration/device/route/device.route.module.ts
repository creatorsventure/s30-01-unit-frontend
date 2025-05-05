import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RouteResolver} from '../../../shared/resolver/route.resolver';
import {APP_NAVIGATION} from '../../../shared/routes/navigation.constant';
import {DeviceIndexComponent} from '../index/device.index.component';
import {DeviceListComponent} from '../list/device.list.component';
import {DeviceOpsComponent} from '../ops/device.ops.component';
import {PermissionGuard} from '../../../shared/guard/permission.guard';

export const routes: Routes = [{
    path: '',
    component: DeviceIndexComponent,
    pathMatch: 'prefix',
    data: {
        pageName: APP_NAVIGATION.device,
        title: 'app.page.' + APP_NAVIGATION.device + '.name',
        description: 'app.page.' + APP_NAVIGATION.device + '.description',
        icon: 'tablet'
    },
    children: [{
        path: '',
        component: DeviceListComponent,
        data: {pageName: APP_NAVIGATION.device, title: 'app.general.button.all', crudOps: APP_NAVIGATION.permissions.list},
    }, {
        path: APP_NAVIGATION.permissions.add,
        component: DeviceOpsComponent,
        data: {pageName: APP_NAVIGATION.device, title: 'app.general.button.add', crudOps: APP_NAVIGATION.permissions.add},
        canActivate: [PermissionGuard]
    }, {
        path: APP_NAVIGATION.permissions.edit + APP_NAVIGATION.resolverParam,
        component: DeviceOpsComponent,
        data: {pageName: APP_NAVIGATION.device, title: 'app.general.button.edit', crudOps: APP_NAVIGATION.permissions.edit},
        resolve: {object: RouteResolver},
        canActivate: [PermissionGuard]
    }, {
        path: APP_NAVIGATION.permissions.view + APP_NAVIGATION.resolverParam,
        component: DeviceOpsComponent,
        data: {pageName: APP_NAVIGATION.device, title: 'app.general.button.view', crudOps: APP_NAVIGATION.permissions.view},
        resolve: {object: RouteResolver},
        canActivate: [PermissionGuard]
    }]
}];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class DeviceRouteModule {
}
