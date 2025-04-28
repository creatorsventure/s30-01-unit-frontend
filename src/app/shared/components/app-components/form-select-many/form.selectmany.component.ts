import {Component, forwardRef, Input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {ControlValueAccessorDirective} from '../../../directives/ControlValueAccessorDirective';

@Component({
    selector: 'app-form-select-many',
    templateUrl: 'form.selectmany.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormSelectManyComponent),
            multi: true,
        },
    ],
    standalone: false
})
export class FormSelectManyComponent<T> extends ControlValueAccessorDirective<T> {
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
}
