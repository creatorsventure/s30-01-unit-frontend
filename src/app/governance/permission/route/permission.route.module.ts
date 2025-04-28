import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RouteResolver} from '../../../shared/resolver/route.resolver';
import {APP_NAVIGATION} from '../../../shared/routes/navigation.constant';
import {PermissionIndexComponent} from '../index/permission.index.component';
import {PermissionListComponent} from '../list/permission.list.component';
import {PermissionOpsComponent} from '../ops/permission.ops.component';
import {PermissionGuard} from '../../../shared/guard/permission.guard';

export const routes: Routes = [{
    path: '',
    component: PermissionIndexComponent,
    pathMatch: 'prefix',
    data: {
        pageName: APP_NAVIGATION.permission,
        title: 'app.page.' + APP_NAVIGATION.permission + '.name',
        description: 'app.page.' + APP_NAVIGATION.permission + '.description',
        icon: 'aim'
    },
    children: [{
        path: '',
        component: PermissionListComponent,
        data: {pageName: APP_NAVIGATION.permission, title: 'app.general.button.all', crudOps: APP_NAVIGATION.permissions.list},
        canActivate: [PermissionGuard]
    }, {
        path: APP_NAVIGATION.permissions.add,
        component: PermissionOpsComponent,
        data: {pageName: APP_NAVIGATION.permission, title: 'app.general.button.add', crudOps: APP_NAVIGATION.permissions.add},
        canActivate: [PermissionGuard]
    }, {
        path: APP_NAVIGATION.permissions.edit + APP_NAVIGATION.resolverParam,
        component: PermissionOpsComponent,
        data: {pageName: APP_NAVIGATION.permission, title: 'app.general.button.edit', crudOps: APP_NAVIGATION.permissions.edit},
        resolve: {object: RouteResolver},
        canActivate: [PermissionGuard]
    }, {
        path: APP_NAVIGATION.permissions.view + APP_NAVIGATION.resolverParam,
        component: PermissionOpsComponent,
        data: {pageName: APP_NAVIGATION.permission, title: 'app.general.button.view', crudOps: APP_NAVIGATION.permissions.view},
        resolve: {object: RouteResolver},
        canActivate: [PermissionGuard]
    }]
}];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class PermissionRouteModule {
}
