export enum CONTROL_TYPE {
    INPUT = 1,
    INPUT_SPECIAL = 2,
    NUMERIC = 3,
    PASSWORD = 4,
    SELECT_ONE = 5,
    EMAIL = 6,
    SELECT_MANY = 7,
    PHONE = 8,
    CURRENCY = 9,
    SWITCH = 10,
    URL = 11
}

export class Control {
    type?: CONTROL_TYPE;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    patternKey?: string;
    isNumeric?: boolean;
    isEmail?: boolean;
    tooltip?: string;
}

