import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {en_US, NZ_I18N} from 'ng-zorro-antd/i18n';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';

import {LocationStrategy, PathLocationStrategy, registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';

import {AppRoutingModule} from './app-routing.module';
import {TemplateModule} from './shared/template/template.module';
import {SharedModule} from './shared/shared.module';

import {AppComponent} from './app.component';
import {CommonLayoutComponent} from './layouts/common-layout/common-layout.component';
import {FullLayoutComponent} from './layouts/full-layout/full-layout.component';

import {NgChartjsModule} from 'ng-chartjs';
import {ThemeConstantService} from './shared/services/theme-constant.service';
import {HttpBackend, HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

registerLocaleData(en);

export function createTranslateLoader(http: HttpBackend): any {
    const rawHttpClient = new HttpClient(http); // 🚫 skips interceptors
    return new TranslateHttpLoader(rawHttpClient, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [AppComponent, CommonLayoutComponent, FullLayoutComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NzBreadCrumbModule,
        TemplateModule,
        SharedModule,
        NgChartjsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpBackend],
            },
        }),
    ],
    providers: [
        {
            provide: NZ_I18N,
            useValue: en_US,
        },
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy,
        },
        ThemeConstantService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
