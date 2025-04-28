import {Component, forwardRef, Input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {ControlValueAccessorDirective} from '../../../directives/ControlValueAccessorDirective';
import {Control} from '../../../interfaces/control.type';

@Component({
    selector: 'app-form-input',
    templateUrl: 'form.input.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormInputComponent),
            multi: true,
        },
    ],
    standalone: false
})
export class FormInputComponent<T> extends ControlValueAccessorDirective<T> {
    @Input()
    controlName: string;
    @Input()
    pageName: string;
    @Input()
    isRequired = true;
    @Input()
    isHideLabel = false;
    @Input()
    override isDisabled = false;
    @Input()
    crudOps: string;
    @Input()
    controlDesc: Control;
}
