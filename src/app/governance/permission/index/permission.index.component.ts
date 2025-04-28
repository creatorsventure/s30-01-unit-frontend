import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({selector: 'app-permission-index', templateUrl: './permission.index.component.html', styles: [], standalone: false})
export class PermissionIndexComponent implements OnInit {
    constructor(public acRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
    }
}
