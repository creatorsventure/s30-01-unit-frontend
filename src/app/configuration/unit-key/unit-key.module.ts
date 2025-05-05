import {NgModule} from '@angular/core';
import {UnitKeyIndexComponent} from './index/unitKey.index.component';
import {UnitKeyListComponent} from './list/unit-key.list.component';
import {UnitKeyOpsComponent} from './ops/unit-key.ops.component';
import {UnitKeyRouteModule} from './route/unit-key.route.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({declarations: [UnitKeyIndexComponent, UnitKeyListComponent, UnitKeyOpsComponent], imports: [SharedModule, UnitKeyRouteModule]})
export class UnitKeyModule {
}
