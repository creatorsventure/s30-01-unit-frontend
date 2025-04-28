import {SideNavInterface} from '../../interfaces/side-nav.type';
import {APP_NAVIGATION} from '../../routes/navigation.constant';

export const ROUTESX: SideNavInterface[] = [
    {
        path: APP_NAVIGATION.dashboard,
        title: 'Dashboard',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'dashboard',
        submenu: [],
    },
    {
        path: '',
        title: 'app.page.' + APP_NAVIGATION.governance + '.name',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'compass',
        submenu: [
            {
                path: APP_NAVIGATION.governance + '/' + APP_NAVIGATION.organization,
                title: 'app.page.' + APP_NAVIGATION.organization + '.name',
                iconType: 'nzIcon',
                icon: 'bank',
                iconTheme: 'outline',
                submenu: [],
            },
            {
                path: APP_NAVIGATION.governance + '/' + APP_NAVIGATION.permission,
                title: 'app.page.' + APP_NAVIGATION.permission + '.name',
                iconType: 'nzIcon',
                icon: 'aim',
                iconTheme: 'outline',
                submenu: [],
            },
            {
                path: APP_NAVIGATION.governance + '/' + APP_NAVIGATION.menu,
                title: 'app.page.' + APP_NAVIGATION.menu + '.name',
                iconType: 'nzIcon',
                icon: 'menu',
                iconTheme: 'outline',
                submenu: [],
            },
            {
                path: APP_NAVIGATION.governance + '/' + APP_NAVIGATION.role,
                title: 'app.page.' + APP_NAVIGATION.role + '.name',
                iconType: 'nzIcon',
                icon: 'flag',
                iconTheme: 'outline',
                submenu: [],
            },
            {
                path: APP_NAVIGATION.governance + '/' + APP_NAVIGATION.user,
                title: 'app.page.' + APP_NAVIGATION.user + '.name',
                iconType: 'nzIcon',
                icon: 'user',
                iconTheme: 'outline',
                submenu: [],
            },
            {
                path: APP_NAVIGATION.governance + '/' + APP_NAVIGATION.password,
                title: 'app.page.' + APP_NAVIGATION.password + '.name',
                iconType: 'nzIcon',
                icon: 'key',
                iconTheme: '',
                submenu: [],
            },
        ],
    },
];
