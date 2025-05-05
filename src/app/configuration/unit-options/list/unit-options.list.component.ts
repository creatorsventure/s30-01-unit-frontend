import {Component, OnInit} from '@angular/core';
import {ListAbstract} from '../../../shared/abstract/list.abstract';
import {ActivatedRoute} from '@angular/router';
import {CRUDService} from '../../../shared/services/crud.service';
import {AlertService} from '../../../shared/services/alert.service';

@Component({selector: 'app-unitOptions-list', templateUrl: './unit-options.list.component.html', styles: [], standalone: false})
export class UnitOptionsListComponent extends ListAbstract implements OnInit {
    constructor(protected override activatedRoute: ActivatedRoute,
                protected override service: CRUDService,
                protected override alertService: AlertService) {
        super(activatedRoute, service, alertService);
    }

    ngOnInit(): void {
        super.init();
    }
}
