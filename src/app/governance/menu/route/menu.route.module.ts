import {NgModule} from '@angular/core';
import {APP_NAVIGATION} from '../../../shared/routes/navigation.constant';
import {MenuIndexComponent} from '../index/menu.index.component';
import {RouterModule, Routes} from '@angular/router';
import {MenuListComponent} from '../list/menu.list.component';
import {MenuOpsComponent} from '../ops/menu.ops.component';
import {RouteResolver} from '../../../shared/resolver/route.resolver';
import {PermissionGuard} from '../../../shared/guard/permission.guard';

export const routes: Routes = [
    {
        path: '',
        component: MenuIndexComponent,
        pathMatch: 'prefix',
        data: {
            pageName: APP_NAVIGATION.menu,
            title: 'app.page.' + APP_NAVIGATION.menu + '.name',
            description: 'app.page.' + APP_NAVIGATION.menu + '.description',
            icon: 'menu',
        },
        children: [
            {
                path: '',
                component: MenuListComponent,
                data: {
                    pageName: APP_NAVIGATION.menu,
                    title: 'app.general.button.all',
                    crudOps: APP_NAVIGATION.permissions.list,
                },
                canActivate: [PermissionGuard]
            },
            {
                path: APP_NAVIGATION.permissions.add,
                component: MenuOpsComponent,
                data: {
                    pageName: APP_NAVIGATION.menu,
                    title: 'app.general.button.add',
                    crudOps: APP_NAVIGATION.permissions.add,
                },
                canActivate: [PermissionGuard]
            },
            {
                path: APP_NAVIGATION.permissions.edit + APP_NAVIGATION.resolverParam,
                component: MenuOpsComponent,
                data: {
                    pageName: APP_NAVIGATION.menu,
                    title: 'app.general.button.edit',
                    crudOps: APP_NAVIGATION.permissions.edit,
                },
                resolve: {
                    object: RouteResolver,
                },
                canActivate: [PermissionGuard]
            },
            {
                path: APP_NAVIGATION.permissions.view + APP_NAVIGATION.resolverParam,
                component: MenuOpsComponent,
                data: {
                    pageName: APP_NAVIGATION.menu,
                    title: 'app.general.button.view',
                    crudOps: APP_NAVIGATION.permissions.view,
                },
                resolve: {
                    object: RouteResolver,
                },
                canActivate: [PermissionGuard]
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MenuRouteModule {
}
