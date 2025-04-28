import {Directive, Inject, Injector, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, FormControlDirective, FormControlName, FormGroupDirective, NgControl} from '@angular/forms';
import {AppControlService} from '../services/app.control.service';
import {APP_NAVIGATION} from '../routes/navigation.constant';
import {Subject} from 'rxjs';

@Directive({
    selector: '[appControlValueAccessor]',
})
export class ControlValueAccessorDirective<T> implements ControlValueAccessor, OnInit {
    control: FormControl | undefined;
    permissions: any = APP_NAVIGATION.permissions;
    isDisabled = false;


    private destroy = new Subject<void>();
    protected onTouched!: () => T;
    protected onChange: (value: any) => void = () => {
    };

    constructor(@Inject(Injector) private injector: Injector,
                public appCtrlService: AppControlService) {
    }

    ngOnInit(): void {
        this.setFormControl();
    }

    setFormControl(): void {
        try {
            const formControl = this.injector.get(NgControl);

            switch (formControl.constructor) {
                case FormControlName:
                    this.control = this.injector
                        .get(FormGroupDirective)
                        .getControl(formControl as FormControlName);
                    break;
                default:
                    this.control = (formControl as FormControlDirective)
                        .form as FormControl;
                    break;
            }
        } catch (err) {
            this.control = new FormControl();
        }
    }

    writeValue(value: T): void {
        if (!this.control) {
            this.control = new FormControl(value);
        } else if (this.control.value !== value) {
            this.control.setValue(value, {emitEvent: false}); // ✅ Prevent recursion
        }
        /* this.control
            ? this.control.setValue(value)
            : (this.control = new FormControl(value));*/
    }

    registerOnChange(fn: (val: T | null) => T): void {
        /* this.control?.valueChanges
            .pipe(
                takeUntil(this.destroy),
                startWith(this.control.value),
                distinctUntilChanged(),
            )
            .subscribe((val) => {
                this.onChange(val);
            }); */
        /* this.control?.valueChanges
            .pipe(
                takeUntil(this.destroy),
                startWith(this.control.value),
                distinctUntilChanged(),
                tap((val) => fn(val))
            )
            .subscribe(() => this.control?.markAsUntouched()); */
    }

    registerOnTouched(fn: () => T): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

}
