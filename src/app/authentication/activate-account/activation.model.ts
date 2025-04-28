export interface IVerifySignup {
    adminEmail: string;
    adminName: string;
    adminUserId: string;
    adminMobileNumber: string;
    adminCountryCode: string;
    entityName: string;
    entityCode: string;
    entityId: string;
    otpRequired: boolean;
    otp: string;
}

export interface IVerifyOTP {
    userId: string;
    unitId: string;
    merchantId?: string;
    otp: string;
}


