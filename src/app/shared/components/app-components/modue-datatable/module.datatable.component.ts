import {Component, Input, OnInit} from '@angular/core';
import {IPagination} from '../../../interfaces/Pagination.type';
import {CRUDService} from '../../../services/crud.service';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {API_METHOD, APP_NAVIGATION} from '../../../routes/navigation.constant';
import {AlertService} from '../../../services/alert.service';
import {AuthService} from '../../../services/auth.service';

@Component({
    selector: 'app-module-datatable',
    templateUrl: 'module.datatable.component.html',
    standalone: false
})
export class ModuleDatatableComponent implements OnInit {
    sessionPermissions: string[];
    permissions = APP_NAVIGATION.permissions;

    constructor(private service: CRUDService,
                private alertService: AlertService,
                private authService: AuthService) {
    }

    @Input()
    pageName: string;

    @Input()
    paginationDto: IPagination;

    @Input()
    public addButtonDisplay = true;

    @Input()
    public viewButtonDisplay = true;

    @Input()
    public editButtonDisplay = true;

    @Input()
    public deleteButtonDisplay = true;

    @Input()
    public resendPasswordMailOption = false;

    @Input()
    public signUpMailOption = false;

    ngOnInit(): void {
        this.sessionPermissions = this.authService.getPermissions();
    }

    public refreshDatatable(): void {
        this.paginationDto.loading = true;
        this.service.readAll(this.pageName, this.paginationDto).subscribe({
            next: (responseObj) => {
                this.paginationDto = responseObj;
            },
            error: (err) => {
                this.paginationDto.loading = false;
            }
        });
    }

    public changeStatus(id: number, inStatus: boolean): void {
        this.service.changeStatus(this.pageName, id, inStatus).subscribe({
            next: (status) => {
                if (status) {
                    this.alertService.success('app.message.success.000', true);
                    this.refreshDatatable();
                }
            },
            error: (err) => {
                this.alertService.alertHttpErrorResp(err, null);
            }
        });
    }

    public delete(id: number): void {
        this.service.delete(this.pageName, id).subscribe({
            next: (status) => {
                if (status) {
                    this.alertService.success('app.message.success.000', true);
                    this.refreshDatatable();
                }
            },
            error: (err) => {
                this.alertService.alertHttpErrorResp(err, null);
            }
        });
    }

    public resendPasswordMail(id: number): void {
        this.service
            .read(APP_NAVIGATION.password + API_METHOD.resendPasswordMail, [
                {key: 'id', value: id},
            ])
            .subscribe({
                next: (status) => {
                    if (status) {
                        this.alertService.success('app.message.success.000', true);
                        this.refreshDatatable();
                    }
                },
                error: (err) => {
                    this.alertService.alertHttpErrorResp(err, null);
                }
            });
    }

    public signUpMail(id: number): void {
        this.service
            .read(APP_NAVIGATION.unit + API_METHOD.signupMail, [{key: 'id', value: id}])
            .subscribe({
                next: (status) => {
                    if (status) {
                        this.alertService.success('app.message.success.000', true);
                        this.refreshDatatable();
                    }
                },
                error: (err) => {
                    this.alertService.alertHttpErrorResp(err, null);
                }
            });
    }

    public onQueryParamsChanged(params: NzTableQueryParams): void {
        this.paginationDto.pageSize = params.pageSize;
        this.paginationDto.pageIndex = params.pageIndex;
        const currentSort = params.sort.find((item) => item.value !== null);
        this.paginationDto.sortField = (currentSort && currentSort.key) || null;
        this.paginationDto.sortOrder = (currentSort && currentSort.value) || null;
        this.paginationDto.result = [];
        this.refreshDatatable();
    }
}
