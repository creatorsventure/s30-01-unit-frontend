import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({selector: 'app-user-index', templateUrl: './user.index.component.html', styles: [], standalone: false})
export class UserIndexComponent implements OnInit {
    constructor(public acRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
    }
}
