/*
============================================
Title: BCRS
Author: Clayton Stacy, Christine Bohnet, Jeff Shepherd, Verlee Washington
Date: 20 Oct 2020
Description: app module file
============================================
*/

import { BrowserModule } from '@angular/platform-browser';
import { forwardRef, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SigninComponent } from './pages/signin/signin.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { SecurityQuestionListComponent } from './pages/security-question-list/security-question-list.component';
import { SecurityQuestionCreateComponent } from './pages/security-question-create/security-question-create.component';
import { SecurityQuestionDetailsComponent } from './pages/security-question-details/security-question-details.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { DeleteRecordDialogComponent } from './shared/delete-record-dialog/delete-record-dialog.component';
import { PhoneFormatPipe } from './shared/phone-format.pipe';
import { MatSelectModule } from '@angular/material/select';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductCreateComponent } from './pages/product-create/product-create.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { VerifyUsernameFormComponent } from './pages/verify-username-form/verify-username-form.component';
import { VerifySecurityQuestionsFormComponent } from './pages/verify-security-questions-form/verify-security-questions-form.component';
import { ResetPasswordFormComponent } from './pages/reset-password-form/reset-password-form.component';
import { RegisterComponent } from './pages/register/register.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import { ErrorComponent } from './pages/error/error.component';
import { ErrorInterceptor } from './shared/error.interceptor';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { RoleListComponent } from './pages/role-list/role-list.component';
import { RoleCreateComponent } from './pages/role-create/role-create.component';
import { RoleDetailsComponent } from './pages/role-details/role-details.component';
import { ChartModule } from 'primeng/chart';
import { InvoiceListComponent } from './pages/invoice-list/invoice-list.component';
import { PurchasesByServiceGraphComponent } from './pages/purchases-by-service-graph/purchases-by-service-graph.component';
import { InvoiceSummaryDialogComponent } from './shared/invoice-summary-dialog/invoice-summary-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BaseLayoutComponent,
    AuthLayoutComponent,
    AboutComponent,
    ContactComponent,
    NotFoundComponent,
    SigninComponent,
    UserListComponent,
    UserDetailsComponent,
    UserCreateComponent,
    SecurityQuestionListComponent,
    SecurityQuestionCreateComponent,
    SecurityQuestionDetailsComponent,
    DeleteRecordDialogComponent,
    PhoneFormatPipe,
    ProductListComponent,
    ProductCreateComponent,
    ProductDetailsComponent,
    VerifyUsernameFormComponent,
    VerifySecurityQuestionsFormComponent,
    ResetPasswordFormComponent,
    RegisterComponent,
    ErrorComponent,
    UserProfileComponent,
    RoleListComponent,
    RoleCreateComponent,
    RoleDetailsComponent,
    InvoiceListComponent,
    PurchasesByServiceGraphComponent,
    InvoiceSummaryDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatStepperModule,
    MatListModule,
    ChartModule,
    MatCheckboxModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
