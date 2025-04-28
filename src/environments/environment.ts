// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {alertTypeOptions} from '../app/shared/constant/org.constant';

export const environment = {
    production: false,
    primaryBackendUrl: 'http://local.cloud-gateway.docker:8080/api/v1/unit-service/',
    orgServiceApiURL: 'http://local.cloud-gateway.docker:8080/api/v1/org-service/', // API Gateway
    secret: '5Aje3AoJsUlvY5zvDUm7U1Iqx4c+ehJP5BBqOtV0exE=',
    alertType: alertTypeOptions.notification
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
