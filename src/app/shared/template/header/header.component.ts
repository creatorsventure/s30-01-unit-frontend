import {Component} from '@angular/core';
import {ThemeConstantService} from '../../services/theme-constant.service';
import {APP_NAVIGATION, LOCAL_STORAGE_KEYS} from '../../routes/navigation.constant';
import {NzModalService} from 'ng-zorro-antd/modal';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {StorageService} from '../../services/storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    standalone: false
})

export class HeaderComponent {

    currentUserName = 'User';
    searchVisible = false;
    quickViewVisible = false;
    isFolded: boolean;
    isExpand: boolean;

    constructor(
        private router: Router,
        public authService: AuthService,
        private modal: NzModalService,
        private translate: TranslateService,
        public storage: StorageService,
        private themeService: ThemeConstantService) {
    }

    logout(): void {
        // console.log('authInfo Logout: ', authInfo);
        this.authService.logout()
            .subscribe({
                next: (status: boolean) => {
                    if (status) {
                        this.router.navigate([APP_NAVIGATION.authentication]);
                    }
                },
                error: (err) => {
                    console.log('login error: ', err);
                    this.modal.error({
                        nzTitle: this.translate.instant('app.page.login.signup-failure-title'),
                        nzContent: err.message,
                    });
                },
                complete: () => {
                },
            });
    }

    ngOnInit(): void {
        this.themeService.isMenuFoldedChanges.subscribe(isFolded => this.isFolded = isFolded);
        this.themeService.isExpandChanges.subscribe(isExpand => this.isExpand = isExpand);
        this.currentUserName = this.storage.get(LOCAL_STORAGE_KEYS.USER_NAME);
    }

    toggleFold(): void {
        this.isFolded = !this.isFolded;
        this.themeService.toggleFold(this.isFolded);
    }

    toggleExpand(): void {
        this.isFolded = false;
        this.isExpand = !this.isExpand;
        this.themeService.toggleExpand(this.isExpand);
        this.themeService.toggleFold(this.isFolded);
    }

    searchToggle(): void {
        this.searchVisible = !this.searchVisible;
    }

    quickViewToggle(): void {
        this.quickViewVisible = !this.quickViewVisible;
    }

    notificationList = [
        {
            title: 'You received a new message',
            time: '8 min',
            icon: 'mail',
            color: 'ant-avatar-' + 'blue'
        },
        {
            title: 'New user registered',
            time: '7 hours',
            icon: 'user-add',
            color: 'ant-avatar-' + 'cyan'
        },
        {
            title: 'System Alert',
            time: '8 hours',
            icon: 'warning',
            color: 'ant-avatar-' + 'red'
        },
        {
            title: 'You have a new update',
            time: '2 days',
            icon: 'sync',
            color: 'ant-avatar-' + 'gold'
        }
    ];
}
