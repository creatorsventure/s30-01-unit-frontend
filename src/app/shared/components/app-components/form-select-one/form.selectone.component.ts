import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {ControlValueAccessorDirective} from '../../../directives/ControlValueAccessorDirective';

@Component({
    selector: 'app-form-select-one',
    templateUrl: 'form.selectone.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormSelectOneComponent),
            multi: true,
        },
    ],
    standalone: false
})
export class FormSelectOneComponent<T> extends ControlValueAccessorDirective<T> {

    @Input()
    controlName: string;
    @Input()
    controlOptions: Map<any, any>;
    @Input()
    pageName: string;
    @Input()
    crudOps: string;
    @Input()
    isRequired = true;
    @Output()
    change = new EventEmitter<any>();

    onSelectChange(value: any): void {
        this.change.emit(value);
    }
}
