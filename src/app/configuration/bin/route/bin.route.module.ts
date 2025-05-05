import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RouteResolver} from '../../../shared/resolver/route.resolver';
import {APP_NAVIGATION} from '../../../shared/routes/navigation.constant';
import {BinIndexComponent} from '../index/bin.index.component';
import {BinListComponent} from '../list/bin.list.component';
import {BinOpsComponent} from '../ops/bin.ops.component';
import {PermissionGuard} from '../../../shared/guard/permission.guard';

export const routes: Routes = [{
    path: '',
    component: BinIndexComponent,
    pathMatch: 'prefix',
    data: {
        pageName: APP_NAVIGATION.bin,
        title: 'app.page.' + APP_NAVIGATION.bin + '.name',
        description: 'app.page.' + APP_NAVIGATION.bin + '.description',
        icon: 'block'
    },
    children: [{
        path: '',
        component: BinListComponent,
        data: {pageName: APP_NAVIGATION.bin, title: 'app.general.button.all', crudOps: APP_NAVIGATION.permissions.list},
    }, {
        path: APP_NAVIGATION.permissions.add,
        component: BinOpsComponent,
        data: {pageName: APP_NAVIGATION.bin, title: 'app.general.button.add', crudOps: APP_NAVIGATION.permissions.add},
        canActivate: [PermissionGuard]
    }, {
        path: APP_NAVIGATION.permissions.edit + APP_NAVIGATION.resolverParam,
        component: BinOpsComponent,
        data: {pageName: APP_NAVIGATION.bin, title: 'app.general.button.edit', crudOps: APP_NAVIGATION.permissions.edit},
        resolve: {object: RouteResolver},
        canActivate: [PermissionGuard]
    }, {
        path: APP_NAVIGATION.permissions.view + APP_NAVIGATION.resolverParam,
        component: BinOpsComponent,
        data: {pageName: APP_NAVIGATION.bin, title: 'app.general.button.view', crudOps: APP_NAVIGATION.permissions.view},
        resolve: {object: RouteResolver},
        canActivate: [PermissionGuard]
    }]
}];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class BinRouteModule {
}
