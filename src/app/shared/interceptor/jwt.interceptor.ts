import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {StorageService} from '../services/storage.service';
import {API_METHOD, APP_NAVIGATION, LOCAL_STORAGE_KEYS} from '../routes/navigation.constant';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {IAuthInfo} from '../../authentication/login-2/auth-info.model';

@Injectable({
    providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject = new BehaviorSubject<string | null>(null);

    constructor(
        private router: Router,
        private storage: StorageService,
        private authService: AuthService,
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Clone and attach the token
        // console.log('JwtInterceptor.intercept', req);
        const authInfo: IAuthInfo = this.storage.get(LOCAL_STORAGE_KEYS.AUTH_INFO);
        let authReq = req;
        if (authInfo) {
            authReq = this.addHeaders(req, authInfo);
        }


        return next.handle(authReq).pipe(
            catchError(err => {
                if (
                    err instanceof HttpErrorResponse && err.status === 401 &&
                    !req.url.includes(APP_NAVIGATION.authentication + API_METHOD.refreshToken)
                ) {
                    return this.handle401Error(authReq, next);
                }
                return throwError(() => err);
            })
        );
    }

    private addHeaders(request: HttpRequest<any>, authInfo: IAuthInfo): HttpRequest<any> {
        return request.clone({
            setHeaders: {
                Authorization: authInfo?.token ? `Bearer ${authInfo.token}` : ''
            }
        });
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log('JwtInterceptor.handle401Error', request);
        const authInfo = this.storage.get(LOCAL_STORAGE_KEYS.AUTH_INFO);
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            if (!authInfo.refreshToken) {
                this.storage.clearStorage();
                this.logout(); // Force logout if refresh token is missing
                return throwError(() => new Error('No refresh token'));
            }

            return this.authService.refreshToken(authInfo).pipe(
                switchMap(response => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(authInfo.refreshToken);
                    return next.handle(this.addHeaders(request, authInfo));
                }),
                catchError(err => {
                    this.isRefreshing = false;
                    this.logout(); // logout user
                    return throwError(() => err);
                })
            );
        } else {
            return this.refreshTokenSubject.pipe(
                filter(token => token !== null),
                take(1),
                switchMap(token => next.handle(this.addHeaders(request, authInfo)))
            );
        }
    }

    private logout(): void {
        this.authService.logout().subscribe({
            next: (status: boolean) => {
                if (status) {
                    console.log('JwtInterceptor.logout error: ', status);
                    this.router.navigate([APP_NAVIGATION.authentication]);
                }
            },
            error: (err) => {
                console.log('JwtInterceptor.logout error: ', err);
                this.router.navigate([APP_NAVIGATION.authentication]);
            },
        });
    }
}
