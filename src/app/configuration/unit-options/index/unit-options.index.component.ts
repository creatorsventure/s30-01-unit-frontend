import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({selector: 'app-unitOptions-index', templateUrl: './unit-options.index.component.html', styles: [], standalone: false})
export class UnitOptionsIndexComponent implements OnInit {
    constructor(public acRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
    }
}
