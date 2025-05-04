import {Routes} from '@angular/router';
import {APP_NAVIGATION} from './navigation.constant';
import {AuthGuard} from '../guard/auth.guard';

export const COMMON_LAYOUT_ROUTES: Routes = [
    {
        path: APP_NAVIGATION.dashboard,
        loadChildren: () =>
            import('../../dashboard/dashboard.module').then((m) => m.DashboardModule),
        data: {
            headerDisplay: 'none',
        },
        canActivate: [AuthGuard]
    },
    {
        path: APP_NAVIGATION.governance + '/' + APP_NAVIGATION.permission,
        loadChildren: () =>
            import('../../governance/permission/permission.module').then((m) => m.PermissionModule),
        data: {
            parent: APP_NAVIGATION.governance,
            title: 'app.page.' + APP_NAVIGATION.governance + '.name',
        },
        canActivate: [AuthGuard]
    },
    {
        path: APP_NAVIGATION.governance + '/' + APP_NAVIGATION.menu,
        loadChildren: () =>
            import('../../governance/menu/menu.module').then((m) => m.MenuModule),
        data: {
            parent: APP_NAVIGATION.governance,
            title: 'app.page.' + APP_NAVIGATION.governance + '.name',
        },
        canActivate: [AuthGuard]
    },
    {
        path: APP_NAVIGATION.governance + '/' + APP_NAVIGATION.role,
        loadChildren: () =>
            import('../../governance/role/role.module').then((m) => m.RoleModule),
        data: {
            parent: APP_NAVIGATION.governance,
            title: 'app.page.' + APP_NAVIGATION.governance + '.name',
        },
        canActivate: [AuthGuard]
    },
    {
        path: APP_NAVIGATION.governance + '/' + APP_NAVIGATION.user,
        loadChildren: () =>
            import('../../governance/user/user.module').then((m) => m.UserModule),
        data: {
            parent: APP_NAVIGATION.governance,
            title: 'app.page.' + APP_NAVIGATION.governance + '.name',
        },
        canActivate: [AuthGuard]
    },
    {
        path: APP_NAVIGATION.governance + '/' + APP_NAVIGATION.password,
        loadChildren: () =>
            import('../../governance/password/password.module').then((m) => m.PasswordModule),
        data: {
            parent: APP_NAVIGATION.governance,
            title: 'app.page.' + APP_NAVIGATION.governance + '.name',
        },
        canActivate: [AuthGuard]
    },
    {
        path: APP_NAVIGATION.configuration + '/' + APP_NAVIGATION.bin,
        loadChildren: () =>
            import('../../configuration/bin/bin.module').then((m) => m.BinModule),
        data: {
            parent: APP_NAVIGATION.configuration,
            title: 'app.page.' + APP_NAVIGATION.configuration + '.name',
        },
        canActivate: [AuthGuard]
    },
    {
        path: APP_NAVIGATION.configuration + '/' + APP_NAVIGATION.unitOptions,
        loadChildren: () =>
            import('../../configuration/unit-options/unit-options.module').then((m) => m.UnitOptionsModule),
        data: {
            parent: APP_NAVIGATION.configuration,
            title: 'app.page.' + APP_NAVIGATION.configuration + '.name',
        },
        canActivate: [AuthGuard]
    },
    {
        path: APP_NAVIGATION.configuration + '/' + APP_NAVIGATION.unitKey,
        loadChildren: () =>
            import('../../configuration/unit-key/unit-key.module').then((m) => m.UnitKeyModule),
        data: {
            parent: APP_NAVIGATION.configuration,
            title: 'app.page.' + APP_NAVIGATION.configuration + '.name',
        },
        canActivate: [AuthGuard]
    },
    {
        path: APP_NAVIGATION.configuration + '/' + APP_NAVIGATION.merchant,
        loadChildren: () =>
            import('../../configuration/merchant/merchant.module').then((m) => m.MerchantModule),
        data: {
            parent: APP_NAVIGATION.configuration,
            title: 'app.page.' + APP_NAVIGATION.configuration + '.name',
        },
        canActivate: [AuthGuard]
    },
    {
        path: APP_NAVIGATION.configuration + '/' + APP_NAVIGATION.device,
        loadChildren: () =>
            import('../../configuration/device/device.module').then((m) => m.DeviceModule),
        data: {
            parent: APP_NAVIGATION.configuration,
            title: 'app.page.' + APP_NAVIGATION.configuration + '.name',
        },
        canActivate: [AuthGuard]
    },
];
