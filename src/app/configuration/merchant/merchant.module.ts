import {NgModule} from '@angular/core';
import {MerchantIndexComponent} from './index/merchant.index.component';
import {MerchantListComponent} from './list/merchant.list.component';
import {MerchantOpsComponent} from './ops/merchant.ops.component';
import {MerchantRouteModule} from './route/merchant.route.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    declarations: [MerchantIndexComponent, MerchantListComponent, MerchantOpsComponent],
    imports: [SharedModule, MerchantRouteModule]
})
export class MerchantModule {
}
