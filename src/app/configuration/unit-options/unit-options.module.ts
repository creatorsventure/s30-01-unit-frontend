import {NgModule} from '@angular/core';
import {UnitOptionsIndexComponent} from './index/unit-options.index.component';
import {UnitOptionsListComponent} from './list/unit-options.list.component';
import {UnitOptionsOpsComponent} from './ops/unit-options.ops.component';
import {UnitOptionsRouteModule} from './route/unit-options.route.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    declarations: [UnitOptionsIndexComponent, UnitOptionsListComponent, UnitOptionsOpsComponent],
    imports: [SharedModule, UnitOptionsRouteModule]
})
export class UnitOptionsModule {
}
