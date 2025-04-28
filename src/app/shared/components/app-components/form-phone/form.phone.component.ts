import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, forwardRef, Injector, Input, OnInit, Output} from '@angular/core';
import {FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ControlValueAccessorDirective} from '../../../directives/ControlValueAccessorDirective';
import {PhoneNumberUtil} from 'google-libphonenumber';
import * as countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import {AppControlService} from '../../../services/app.control.service';

countries.registerLocale(enLocale);

@Component({
    selector: 'app-form-phone',
    templateUrl: './form.phone.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormPhoneComponent),
            multi: true
        }
    ],
    standalone: false
})
export class FormPhoneComponent extends ControlValueAccessorDirective<string> implements OnInit, AfterViewInit {
    @Input() controlName: string;
    @Input() pageName: string;
    @Input() isRequired = true;
    @Input() isHideLabel = false;
    @Input() override isDisabled = false;
    @Input() crudOps: string;
    @Input() controlDesc: any;
    @Input() parentForm!: FormGroup;

    @Output() countryCodeChange = new EventEmitter<string>();

    countryList: { code: string; name: string; dialCode: string; flag: string }[] = [];
    selectedCountry: { code: string; name: string; dialCode: string; flag: string };
    phoneInput = '';
    phoneUtil = PhoneNumberUtil.getInstance();

    constructor(
        injector: Injector,
        appCtrlService: AppControlService,
        private cdr: ChangeDetectorRef
    ) {
        super(injector, appCtrlService);
    }

    override ngOnInit(): void {
        this.setFormControl();

        const regions = Array.from(this.phoneUtil.getSupportedRegions());
        this.countryList = regions.map(code => {
            try {
                const example = this.phoneUtil.getExampleNumber(code);
                const dialCode = '+' + example.getCountryCode();
                const name = countries.getName(code, 'en') || code;
                const flag = this.getFlagEmoji(code);
                return {code, name, dialCode, flag};
            } catch {
                return null;
            }
        }).filter(Boolean).sort((a, b) => a.name.localeCompare(b.name));

        if (this.crudOps === this.permissions.view || this.crudOps === this.permissions.edit) {
            const value = this.parentForm?.get('countryCode')?.value;
            if (value) {
                this.selectedCountry = this.countryList.find(c => c.dialCode === value);
            }
        }
        if (!this.selectedCountry) {
            this.selectedCountry = this.countryList.find(c => c.code === 'OM') || this.countryList[0];
        }
        this.countryCodeChange.emit(this.selectedCountry.dialCode);
    }

    ngAfterViewInit(): void {
        this.cdr.detectChanges();
    }

    getFlagEmoji(countryCode: string): string {
        if (!countryCode || countryCode.length !== 2) {
            return '';
        }
        const codePoints = countryCode
            .toUpperCase()
            .split('')
            .map(char => 127397 + char.charCodeAt(0));
        return String.fromCodePoint(...codePoints);
    }

    onPhoneChange(raw: string): void {
        this.phoneInput = raw;

        try {
            const parsed = this.phoneUtil.parseAndKeepRawInput(raw, this.selectedCountry.code);
            if (this.phoneUtil.isValidNumber(parsed)) {
                const nationalNumber = parsed.getNationalNumber().toString();
                this.control?.setValue(nationalNumber, {emitEvent: false});
                this.onChange(nationalNumber);
            } else {
                this.control?.setValue(null, {emitEvent: false});
                this.onChange(null);
            }
        } catch {
            this.control?.setValue(null, {emitEvent: false});
            this.onChange(null);
        }

        this.onTouched?.();
    }

    onCountryChange(code: string): void {
        const selected = this.countryList.find(c => c.code === code);
        console.log('country code:', selected);
        if (!selected || selected.code === this.selectedCountry.code) {
            return;
        }

        this.selectedCountry = selected;
        this.countryCodeChange.emit(this.selectedCountry.dialCode); // Emit dial code to parent

        this.phoneInput = '';
        this.control?.setValue(null, {emitEvent: false});
        this.onChange(null);
    }

    override writeValue(value: string): void {
        this.phoneInput = value || '';
    }

    override registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    override registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    filterOption = (input: string, option: any): boolean => {
        return option?.nzLabel?.toLowerCase().includes(input.toLowerCase());
    };
}
