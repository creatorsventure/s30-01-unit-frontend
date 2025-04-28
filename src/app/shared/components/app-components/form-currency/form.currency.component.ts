import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {ControlValueAccessorDirective} from '../../../directives/ControlValueAccessorDirective';
import * as currencyCodes from 'currency-codes';

@Component({
    selector: 'app-form-currency',
    templateUrl: 'form.currency.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormCurrencyComponent),
            multi: true,
        },
    ],
    standalone: false
})
export class FormCurrencyComponent<T> extends ControlValueAccessorDirective<T> {

    @Input()
    controlName: string;
    @Input()
    pageName: string;
    @Input()
    crudOps: string;
    @Input()
    isRequired = true;
    @Output()
    change = new EventEmitter<any>();

    currencies = currencyCodes.data;

    onSelectChange(value: any): void {
        this.change.emit(value);
    }

}