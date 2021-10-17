import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';
import { ApplicationinsightsAngularpluginErrorService } from '@microsoft/applicationinsights-angularplugin-js';

// app main component
import { AppComponent } from './app.component';

// routing module
import { AppRoutingModule } from './app-routing.module';

// bootstrap module
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AngularSplitModule } from 'angular-split';
import { ToastrModule } from 'ngx-toastr';

// pages
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MyWorklistPageComponent } from './pages/my-worklist-page/my-worklist-page.component';
import { ViewAdministrationPageComponent } from './pages/view-administration-page/view-administration-page.component';

// reusable components
import { ComponentsModule } from './components/components.module';

import { DataListService } from './shared/services/data-list.service';
import { AuthService } from './shared/services/auth.service';
import { SpinnerService } from './shared/services/spinner.service';
import { ViewsService } from './shared/services/views.service';
import { LookupService } from './shared/services/lookup.service';
import { ConfigurationService } from './shared/services/configuration.service';
import { WorklistService } from './shared/services/worklist.service';
import { AuthGuard } from './shared/services/auth.guard';
import { ErrorInterceptor } from './shared/interceptor/error.interceptor';
import { SpinnerInterceptor } from './shared/interceptor/spinner.interceptor';
import { AuthInterceptor } from './shared/interceptor/auth.interceptor';

@NgModule({
  declarations: [AppComponent, LoginPageComponent, MyWorklistPageComponent, ViewAdministrationPageComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    AngularSplitModule,
    ToastrModule.forRoot(),
    ComponentsModule,
    AppRoutingModule,
    NgxMaskModule.forRoot({ validation: true })
  ],
  providers: [
    DataListService,
    AuthService,
    SpinnerService,
    ViewsService,
    LookupService,
    ConfigurationService,
    WorklistService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: ErrorHandler, useClass: ApplicationinsightsAngularpluginErrorService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
