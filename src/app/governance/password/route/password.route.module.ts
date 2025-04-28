import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {APP_NAVIGATION} from '../../../shared/routes/navigation.constant';
import {PasswordOpsComponent} from '../ops/password.ops.component';
import {PermissionGuard} from '../../../shared/guard/permission.guard';

export const routes: Routes = [
    {
        path: '',
        component: PasswordOpsComponent,
        data: {
            pageName: APP_NAVIGATION.password,
            title: 'app.page.' + APP_NAVIGATION.password + '.name',
            description: 'app.page.' + APP_NAVIGATION.password + '.description',
            crudOps: APP_NAVIGATION.permissions.add,
            icon: 'key'
        },
        canActivate: [PermissionGuard]
    }];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class PasswordRouteModule {
}
