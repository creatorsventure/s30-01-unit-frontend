import {NgModule} from '@angular/core';
import {PasswordOpsComponent} from './ops/password.ops.component';
import {PasswordRouteModule} from './route/password.route.module';
import {SharedModule} from '../../shared/shared.module';
import {NzDividerComponent} from 'ng-zorro-antd/divider';
import {NzPageHeaderComponent, NzPageHeaderContentDirective} from 'ng-zorro-antd/page-header';

@NgModule({
    declarations: [PasswordOpsComponent],
    imports: [
        SharedModule,
        PasswordRouteModule,
        NzDividerComponent,
        NzPageHeaderContentDirective,
        NzPageHeaderComponent]
})
export class PasswordModule {
}
