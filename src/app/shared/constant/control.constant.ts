import {CONTROL_TYPE} from '../interfaces/control.type';

export const CONTROL_DESCRIPTION = {
    input: {
        type: CONTROL_TYPE.INPUT,
        minLength: 3,
        maxLength: 250,
        pattern: '^[a-zA-Z0-9_ ]*$',
        patternKey: 'app.regxPatterns.input',
        tooltip: 'app.general.tooltip.general'
    },
    inputSpecial: {
        type: CONTROL_TYPE.INPUT_SPECIAL,
        minLength: 3,
        maxLength: 250,
        pattern: '^[a-zA-Z0-9_, ./-]*$',
        patternKey: 'app.regxPatterns.inputSpecial',
        tooltip: 'app.general.tooltip.general'
    },
    url: {
        type: CONTROL_TYPE.URL,
        minLength: 3,
        maxLength: 250,
        pattern: '^(https?:\\/\\/)(localhost|\\d{1,3}(\\.\\d{1,3}){3}|[\\w.-]+\\.[a-z]{2,})(:\\d{1,5})?(\\/[^\\s]*)?$',
        patternKey: 'app.regxPatterns.url',
        tooltip: 'app.general.tooltip.general'
    },
    numeric: {
        type: CONTROL_TYPE.NUMERIC,
        isNumeric: true,
        minLength: 1,
        maxLength: 9,
        pattern: '^[0-9]*$',
        patternKey: 'app.regxPatterns.numeric',
        tooltip: 'app.general.tooltip.general'
    },
    password: {
        type: CONTROL_TYPE.PASSWORD,
        minLength: 1,
        maxLength: 16,
        pattern: '^[a-zA-Z0-9@$#]*$',
        patternKey: 'app.regxPatterns.password',
        tooltip: 'app.general.tooltip.general'
    },
    email: {
        type: CONTROL_TYPE.EMAIL,
        isEmail: true,
        patternKey: 'app.regxPatterns.email',
        tooltip: 'app.general.tooltip.no-length'
    },
    phone: {
        type: CONTROL_TYPE.PHONE,
        patternKey: 'app.regxPatterns.phone',
        tooltip: 'app.general.tooltip.no-length'
    },
    selectOne: {
        type: CONTROL_TYPE.SELECT_ONE
    },
    selectMany: {
        type: CONTROL_TYPE.SELECT_MANY
    },
    currency: {
        type: CONTROL_TYPE.CURRENCY
    },
    switch: {
        type: CONTROL_TYPE.SWITCH
    },
};
