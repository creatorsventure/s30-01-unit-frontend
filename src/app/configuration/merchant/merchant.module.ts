import {NgModule} from '@angular/core';
import {MerchantIndexComponent} from './index/merchant.index.component';
import {MerchantListComponent} from './list/merchant.list.component';
import {MerchantOpsComponent} from './ops/merchant.ops.component';
import {MerchantRouteModule} from './route/merchant.route.module';
import {SharedModule} from '../../shared/shared.module';
import {NzDividerComponent} from 'ng-zorro-antd/divider';

@NgModule({
    declarations: [MerchantIndexComponent, MerchantListComponent, MerchantOpsComponent],
    imports: [SharedModule, MerchantRouteModule, NzDividerComponent]
})
export class MerchantModule {
}
