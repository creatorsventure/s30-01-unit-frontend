import {Component, forwardRef, Input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {Control} from '../../../interfaces/control.type';
import {ControlValueAccessorDirective} from '../../../directives/ControlValueAccessorDirective';

@Component({
    selector: 'app-form-numeric',
    templateUrl: 'form.numeric.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormNumericComponent),
            multi: true,
        },
    ],
    standalone: false
})
export class FormNumericComponent<T> extends ControlValueAccessorDirective<T> {
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
