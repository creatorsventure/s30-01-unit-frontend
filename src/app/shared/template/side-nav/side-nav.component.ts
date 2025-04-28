import {Component} from '@angular/core';
import {ThemeConstantService} from '../../services/theme-constant.service';
import {SideNavInterface} from '../../interfaces/side-nav.type';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-sidenav',
    templateUrl: './side-nav.component.html',
    standalone: false
})

export class SideNavComponent {

    public menuItems: any[];
    isFolded: boolean;
    isSideNavDark: boolean;
    isExpand: boolean;
    routes: SideNavInterface[];

    constructor(private themeService: ThemeConstantService,
                private authService: AuthService
    ) {
    }

    ngOnInit(): void {
        this.authService.loadRoleMenu().subscribe(menuList => {
            // console.log('Menu list response: ', menuList);
            this.routes = menuList;
            this.menuItems = this.routes.filter(menuItem => menuItem);
        });
        this.themeService.isMenuFoldedChanges.subscribe(isFolded => this.isFolded = isFolded);
        this.themeService.isExpandChanges.subscribe(isExpand => this.isExpand = isExpand);
        this.themeService.isSideNavDarkChanges.subscribe(isDark => this.isSideNavDark = isDark);
    }

    closeMobileMenu(): void {
        if (window.innerWidth < 992) {
            this.isFolded = false;
            this.isExpand = !this.isExpand;
            this.themeService.toggleExpand(this.isExpand);
            this.themeService.toggleFold(this.isFolded);
        }
    }
}
