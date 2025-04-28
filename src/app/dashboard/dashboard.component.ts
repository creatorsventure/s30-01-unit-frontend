import {Component, OnInit} from '@angular/core';
import {APP_NAVIGATION, LOCAL_STORAGE_KEYS} from '../shared/routes/navigation.constant';
import {CRUDService} from '../shared/services/crud.service';
import {IDashboard} from './dashboard.model';
import {StorageService} from '../shared/services/storage.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    standalone: false
})

export class DashboardComponent implements OnInit {

    currentDate = new Date();
    currentUserName = 'User';
    dashboard: IDashboard;
    avatarColor = this.generateColor();
    readonly avatarColors = [
        'ant-avatar-blue',
        'ant-avatar-cyan',
        'ant-avatar-gold',
        'ant-avatar-purple'
    ];

    constructor(public crudService: CRUDService,
                public storage: StorageService) {
    }

    ngOnInit(): void {
        this.currentUserName = this.storage.get(LOCAL_STORAGE_KEYS.USER_NAME);
        setInterval(() => {
            this.currentDate = new Date();
        }, 60000);
        this.crudService.getData(APP_NAVIGATION.dashboard).subscribe(dashboard => {
            this.dashboard = dashboard;
        });
    }

    generateColor(): string {
        const colors = ['#1890ff', '#52c41a', '#faad14', '#eb2f96', '#722ed1'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    getUserInitials(): string {
        if (!this.currentUserName) {
            return '?';
        }
        const parts = this.currentUserName.trim().split(/\s+/); // Split by any whitespace
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        } else if (parts[0].length >= 2) {
            return (parts[0][0] + parts[0][1]).toUpperCase(); // Take first 2 letters
        } else {
            return (parts[0][0] + '?').toUpperCase(); // Fallback for very short names
        }
    }
}
