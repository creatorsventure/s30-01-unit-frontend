import {NgModule} from '@angular/core';
import {BinIndexComponent} from './index/bin.index.component';
import {BinListComponent} from './list/bin.list.component';
import {BinOpsComponent} from './ops/bin.ops.component';
import {BinRouteModule} from './route/bin.route.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    declarations: [BinIndexComponent, BinListComponent, BinOpsComponent],
    imports: [SharedModule, BinRouteModule]
})
export class BinModule {
}
