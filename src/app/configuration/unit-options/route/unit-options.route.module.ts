import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RouteResolver} from '../../../shared/resolver/route.resolver';
import {APP_NAVIGATION} from '../../../shared/routes/navigation.constant';
import {UnitOptionsIndexComponent} from '../index/unit-options.index.component';
import {UnitOptionsListComponent} from '../list/unit-options.list.component';
import {UnitOptionsOpsComponent} from '../ops/unit-options.ops.component';
import {PermissionGuard} from '../../../shared/guard/permission.guard';

export const routes: Routes = [{
    path: '',
    component: UnitOptionsIndexComponent,
    pathMatch: 'prefix',
    data: {
        pageName: APP_NAVIGATION.unitOptions,
        title: 'app.page.' + APP_NAVIGATION.unitOptions + '.name',
        description: 'app.page.' + APP_NAVIGATION.unitOptions + '.description',
        icon: 'unordered-list'
    },
    children: [{
        path: '',
        component: UnitOptionsListComponent,
        data: {pageName: APP_NAVIGATION.unitOptions, title: 'app.general.button.all', crudOps: APP_NAVIGATION.permissions.list},
    }, {
        path: APP_NAVIGATION.permissions.add,
        component: UnitOptionsOpsComponent,
        data: {pageName: APP_NAVIGATION.unitOptions, title: 'app.general.button.add', crudOps: APP_NAVIGATION.permissions.add},
        canActivate: [PermissionGuard]
    }, {
        path: APP_NAVIGATION.permissions.edit + APP_NAVIGATION.resolverParam,
        component: UnitOptionsOpsComponent,
        data: {pageName: APP_NAVIGATION.unitOptions, title: 'app.general.button.edit', crudOps: APP_NAVIGATION.permissions.edit},
        resolve: {object: RouteResolver},
        canActivate: [PermissionGuard]
    }, {
        path: APP_NAVIGATION.permissions.view + APP_NAVIGATION.resolverParam,
        component: UnitOptionsOpsComponent,
        data: {pageName: APP_NAVIGATION.unitOptions, title: 'app.general.button.view', crudOps: APP_NAVIGATION.permissions.view},
        resolve: {object: RouteResolver},
        canActivate: [PermissionGuard]
    }]
}];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class UnitOptionsRouteModule {
}
