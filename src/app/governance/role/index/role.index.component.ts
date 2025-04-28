import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({selector: 'app-role-index', templateUrl: './role.index.component.html', styles: [], standalone: false})
export class RoleIndexComponent implements OnInit {
    constructor(public acRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
    }
}
