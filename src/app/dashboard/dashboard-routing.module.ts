import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {APP_NAVIGATION} from '../shared/routes/navigation.constant';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        data: {
            title: 'Dashboard ',
            headerDisplay: 'none',
        },
    },
    {
        path: '**',
        redirectTo: '/' + APP_NAVIGATION.error,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {
}
