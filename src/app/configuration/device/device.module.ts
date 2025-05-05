import {NgModule} from '@angular/core';
import {DeviceIndexComponent} from './index/device.index.component';
import {DeviceListComponent} from './list/device.list.component';
import {DeviceOpsComponent} from './ops/device.ops.component';
import {DeviceRouteModule} from './route/device.route.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    declarations: [DeviceIndexComponent, DeviceListComponent, DeviceOpsComponent],
    imports: [SharedModule, DeviceRouteModule]
})
export class DeviceModule {
}
