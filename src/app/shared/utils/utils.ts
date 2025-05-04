import {FormControl, FormGroup, ValidationErrors} from '@angular/forms';
import {ParamType} from '../interfaces/Param.type';
import {HttpHeaders, HttpParams} from '@angular/common/http';

export function updateFormDirtyAndValueAndValidity(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
        formGroup.get(key).markAsDirty();
        formGroup.get(key).updateValueAndValidity();
    });
}

export function updateFormPristineAndUntouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
        formGroup.get(key).markAsPristine();
        formGroup.get(key).markAsUntouched();
    });
    formGroup.reset();
}

export function logAllErrorsInForm(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
        const controlErrors: ValidationErrors = formGroup.get(key).errors;
        if (controlErrors != null) {
            Object.keys(controlErrors).forEach((keyError) => {
                console.log(
                    'Key control: ' + key + ', keyError: ' + keyError + ', err value: ',
                    controlErrors[keyError]
                );
            });
        }
    });
}

export function logAllErrorsInFormControl(
    formControl: FormControl,
    formControlName: string
): void {
    const controlErrors: ValidationErrors = formControl?.errors;
    if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
            console.log(
                'Key control: ' +
                formControlName +
                ', keyError: ' +
                keyError +
                ', err value: ',
                controlErrors[keyError]
            );
        });
    }
}

export function constructHeaders(inputHeaders: ParamType[]): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    if (inputHeaders) {
        for (const header of inputHeaders) {
            headers = headers.append(header.key, header.value);
        }
    }
    return headers;
}

export function constructParams(inputParams: ParamType[]): HttpParams {
    let params: HttpParams = new HttpParams();
    if (inputParams) {
        for (const header of inputParams) {
            params = params.append(header.key, header.value);
        }
    }
    return params;
}
