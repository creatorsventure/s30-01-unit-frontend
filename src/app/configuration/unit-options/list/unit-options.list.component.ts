import {Component, OnInit} from '@angular/core';
import {ListAbstract} from '../../../shared/abstract/list.abstract';
import {ActivatedRoute} from '@angular/router';
import {CRUDService} from '../../../shared/services/crud.service';
import {AlertService} from '../../../shared/services/alert.service';
import {IOptions} from '../model/options.model.component';
import {API_METHOD, APP_NAVIGATION} from '../../../shared/routes/navigation.constant';

@Component({selector: 'app-unitOptions-list', templateUrl: './unit-options.list.component.html', styles: [], standalone: false})
export class UnitOptionsListComponent extends ListAbstract implements OnInit {
    isVisible: boolean;
    options: IOptions;

    constructor(protected override activatedRoute: ActivatedRoute,
                protected override service: CRUDService,
                protected override alertService: AlertService) {
        super(activatedRoute, service, alertService);
    }

    ngOnInit(): void {
        super.init();
    }

    showModal(): void {
        this.isVisible = false;
        if (!this.options) {
            this.service.getData(APP_NAVIGATION.unitOptions + API_METHOD.resolveOrgOptions,
            ).subscribe({
                next: (options: IOptions) => {
                    // console.log('Options: ', options);
                    this.options = {
                        captcha: options.captcha,
                        transactionOTP: options.transactionOTP,
                        loginOTP: options.loginOTP,
                        tokenization: options.tokenization,
                        cvvSecurity: options.cvvSecurity,
                        makerCheckerMode: options.makerCheckerMode,
                        masking: options.masking
                    };
                    this.isVisible = true;
                },
                error: (err) => {
                    this.alertService.alertHttpErrorResp(err, APP_NAVIGATION.unitOptions);
                }
            });
        } else {
            this.isVisible = true;
        }
    }

    handleOk(): void {
        this.isVisible = false;
    }

    handleCancel(): void {
        this.isVisible = false;
    }
}
