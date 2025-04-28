import {Injectable} from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class CryptoService {

    constructor() {
    }

    public encrypt(data: string): string {
        return CryptoJS.AES.encrypt(data, environment.secret).toString();
    }

    public decrypt(data: string): string {
        if (data) {
            const bytes = CryptoJS.AES.decrypt(data, environment.secret);
            return bytes.toString(CryptoJS.enc.Utf8);
        }
    }
}
