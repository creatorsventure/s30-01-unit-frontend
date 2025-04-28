import {AfterViewInit, Component, forwardRef, Input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {Control} from '../../../interfaces/control.type';
import {ControlValueAccessorDirective} from '../../../directives/ControlValueAccessorDirective';

@Component({
    selector: 'app-form-switch',
    templateUrl: 'form.switch.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormSwitchComponent),
            multi: true,
        },
    ],
    standalone: false
})
export class FormSwitchComponent<T> extends ControlValueAccessorDirective<T> implements AfterViewInit {

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

    ngAfterViewInit(): void {
        if (this.control && (this.control.value === null || this.control.value === undefined) && this.control.pristine) {
            this.control.setValue(false, {emitEvent: false});
        }
    }

}