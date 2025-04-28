import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RouteResolver} from '../../../shared/resolver/route.resolver';
import {APP_NAVIGATION} from '../../../shared/routes/navigation.constant';
import {RoleIndexComponent} from '../index/role.index.component';
import {RoleListComponent} from '../list/role.list.component';
import {RoleOpsComponent} from '../ops/role.ops.component';
import {PermissionGuard} from '../../../shared/guard/permission.guard';

export const routes: Routes = [{
    path: '',
    component: RoleIndexComponent,
    pathMatch: 'prefix',
    data: {
        pageName: APP_NAVIGATION.role,
        title: 'app.page.' + APP_NAVIGATION.role + '.name',
        description: 'app.page.' + APP_NAVIGATION.role + '.description',
        icon: 'menu'
    },
    children: [{
        path: '',
        component: RoleListComponent,
        data: {pageName: APP_NAVIGATION.role, title: 'app.general.button.all', crudOps: APP_NAVIGATION.permissions.list},
        canActivate: [PermissionGuard]
    }, {
        path: APP_NAVIGATION.permissions.add,
        component: RoleOpsComponent,
        data: {pageName: APP_NAVIGATION.role, title: 'app.general.button.add', crudOps: APP_NAVIGATION.permissions.add},
        canActivate: [PermissionGuard]
    }, {
        path: APP_NAVIGATION.permissions.edit + APP_NAVIGATION.resolverParam,
        component: RoleOpsComponent,
        data: {pageName: APP_NAVIGATION.role, title: 'app.general.button.edit', crudOps: APP_NAVIGATION.permissions.edit},
        resolve: {object: RouteResolver},
        canActivate: [PermissionGuard]
    }, {
        path: APP_NAVIGATION.permissions.view + APP_NAVIGATION.resolverParam,
        component: RoleOpsComponent,
        data: {pageName: APP_NAVIGATION.role, title: 'app.general.button.view', crudOps: APP_NAVIGATION.permissions.view},
        resolve: {object: RouteResolver},
        canActivate: [PermissionGuard]
    }]
}];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class RoleRouteModule {
}
