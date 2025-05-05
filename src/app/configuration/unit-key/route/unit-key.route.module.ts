import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RouteResolver} from '../../../shared/resolver/route.resolver';
import {APP_NAVIGATION} from '../../../shared/routes/navigation.constant';
import {UnitKeyIndexComponent} from '../index/unitKey.index.component';
import {UnitKeyListComponent} from '../list/unit-key.list.component';
import {UnitKeyOpsComponent} from '../ops/unit-key.ops.component';
import {PermissionGuard} from '../../../shared/guard/permission.guard';

export const routes: Routes = [{
    path: '',
    component: UnitKeyIndexComponent,
    pathMatch: 'prefix',
    data: {
        pageName: APP_NAVIGATION.unitKey,
        title: 'app.page.' + APP_NAVIGATION.unitKey + '.name',
        description: 'app.page.' + APP_NAVIGATION.unitKey + '.description',
        icon: 'key'
    },
    children: [{
        path: '',
        component: UnitKeyListComponent,
        data: {pageName: APP_NAVIGATION.unitKey, title: 'app.general.button.all', crudOps: APP_NAVIGATION.permissions.list},
    }, {
        path: APP_NAVIGATION.permissions.add,
        component: UnitKeyOpsComponent,
        data: {pageName: APP_NAVIGATION.unitKey, title: 'app.general.button.add', crudOps: APP_NAVIGATION.permissions.add},
        canActivate: [PermissionGuard]
    }, {
        path: APP_NAVIGATION.permissions.edit + APP_NAVIGATION.resolverParam,
        component: UnitKeyOpsComponent,
        data: {pageName: APP_NAVIGATION.unitKey, title: 'app.general.button.edit', crudOps: APP_NAVIGATION.permissions.edit},
        resolve: {object: RouteResolver},
        canActivate: [PermissionGuard]
    }, {
        path: APP_NAVIGATION.permissions.view + APP_NAVIGATION.resolverParam,
        component: UnitKeyOpsComponent,
        data: {pageName: APP_NAVIGATION.unitKey, title: 'app.general.button.view', crudOps: APP_NAVIGATION.permissions.view},
        resolve: {object: RouteResolver},
        canActivate: [PermissionGuard]
    }]
}];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class UnitKeyRouteModule {
}
