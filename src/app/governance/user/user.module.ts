import {NgModule} from '@angular/core';
import {UserIndexComponent} from './index/user.index.component';
import {UserListComponent} from './list/user.list.component';
import {UserOpsComponent} from './ops/user.ops.component';
import {UserRouteModule} from './route/user.route.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({declarations: [UserIndexComponent, UserListComponent, UserOpsComponent], imports: [SharedModule, UserRouteModule]})
export class UserModule {
}
