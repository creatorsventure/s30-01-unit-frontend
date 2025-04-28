import {Injectable} from '@angular/core';
import {Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {EmailValidators, UniversalValidators} from 'ngx-validators';
import {Control} from '../interfaces/control.type';

@Injectable({providedIn: 'root'})
export class AppControlService {
    constructor(private translate: TranslateService) {
    }

    generateFormControl(control: Control, value: any, isRequired: boolean = true): any {
        return [value, this.getValidators(control, isRequired)];
    }

    private getValidators(control: Control, isRequired: boolean): Validators[] {
        const validations: Validators[] = [];
        if (isRequired) {
            validations.push(Validators.required);
        }
        if (control.minLength) {
            validations.push(Validators.minLength(control.minLength));
        }
        if (control.maxLength) {
            validations.push(Validators.maxLength(control.maxLength));
        }
        if (control.isNumeric) {
            validations.push(UniversalValidators.isNumber);
        }
        if (control.isEmail) {
            validations.push(EmailValidators.normal);
        }
        if (control.pattern) {
            validations.push(Validators.pattern(control.pattern));
        }
        return validations;
    }

    public generateToolTip(
        control: Control,
        pageName: string,
        controlName: string,
        generalFields: boolean = false
    ): string {
        if (control?.tooltip) {
            return this.translate.instant(control.tooltip, {
                controlName: generalFields
                    ? this.getGeneralControlText(controlName)
                    : this.getControlText(pageName, controlName),
                minLength: control.minLength ? control.minLength : 0,
                maxLength: control.minLength ? control.maxLength : 0,
                pattern: control.patternKey ? this.translate.instant(control.patternKey) : ''
            });
        }
        return '';
    }

    public getControlText(pageName: string, controlName: string): string {
        return this.translate.instant(
            'app.page.' + pageName + '.label.' + controlName
        );
    }

    public getGeneralControlText(controlName: string): string {
        return this.translate.instant('app.general.page.' + controlName);
    }
}
