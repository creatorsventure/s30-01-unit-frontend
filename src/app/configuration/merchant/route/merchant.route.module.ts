import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RouteResolver} from '../../../shared/resolver/route.resolver';
import {APP_NAVIGATION} from '../../../shared/routes/navigation.constant';
import {MerchantIndexComponent} from '../index/merchant.index.component';
import {MerchantListComponent} from '../list/merchant.list.component';
import {MerchantOpsComponent} from '../ops/merchant.ops.component';
import {PermissionGuard} from '../../../shared/guard/permission.guard';

export const routes: Routes = [{
    path: '',
    component: MerchantIndexComponent,
    pathMatch: 'prefix',
    data: {
        pageName: APP_NAVIGATION.merchant,
        title: 'app.page.' + APP_NAVIGATION.merchant + '.name',
        description: 'app.page.' + APP_NAVIGATION.merchant + '.description',
        icon: 'shop'
    },
    children: [{
        path: '',
        component: MerchantListComponent,
        data: {pageName: APP_NAVIGATION.merchant, title: 'app.general.button.all', crudOps: APP_NAVIGATION.permissions.list},
    }, {
        path: APP_NAVIGATION.permissions.add,
        component: MerchantOpsComponent,
        data: {pageName: APP_NAVIGATION.merchant, title: 'app.general.button.add', crudOps: APP_NAVIGATION.permissions.add},
        canActivate: [PermissionGuard]
    }, {
        path: APP_NAVIGATION.permissions.edit + APP_NAVIGATION.resolverParam,
        component: MerchantOpsComponent,
        data: {pageName: APP_NAVIGATION.merchant, title: 'app.general.button.edit', crudOps: APP_NAVIGATION.permissions.edit},
        resolve: {object: RouteResolver},
        canActivate: [PermissionGuard]
    }, {
        path: APP_NAVIGATION.permissions.view + APP_NAVIGATION.resolverParam,
        component: MerchantOpsComponent,
        data: {pageName: APP_NAVIGATION.merchant, title: 'app.general.button.view', crudOps: APP_NAVIGATION.permissions.view},
        resolve: {object: RouteResolver},
        canActivate: [PermissionGuard]
    }]
}];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class MerchantRouteModule {
}
