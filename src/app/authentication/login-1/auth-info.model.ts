export interface IAuthInfo {
    userId?: string;
    name?: string;
    password?: string;
    organizationId?: string;
    unitId?: string;
    merchantId?: string;
    roleId?: string;
    permissions?: string[];
    email?: string;
    token?: string;
    refreshToken?: string;
}
