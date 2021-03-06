/*
============================================
Title: BCRS
Author: Clayton Stacy, Christine Bohnet, Jeff Shepherd, & Verlee Washington
Date: 20 Oct 2020
Description: App routing file
============================================
*/

import {HomeComponent} from './pages/home/home.component';
import {BaseLayoutComponent} from './shared/base-layout/base-layout.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthLayoutComponent} from './shared/auth-layout/auth-layout.component';
import {SigninComponent} from './pages/signin/signin.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {AboutComponent} from './pages/about/about.component';
import {ContactComponent} from './pages/contact/contact.component';
import {UserListComponent} from './pages/user-list/user-list.component';
import {UserDetailsComponent} from './pages/user-details/user-details.component';
import {SecurityQuestionListComponent} from './pages/security-question-list/security-question-list.component';
import {SecurityQuestionCreateComponent} from './pages/security-question-create/security-question-create.component';
import {SecurityQuestionDetailsComponent} from './pages/security-question-details/security-question-details.component';
import {SessionGuard} from './session.guard';
import {ProductListComponent} from './pages/product-list/product-list.component';
import {ProductCreateComponent} from './pages/product-create/product-create.component';
import {ProductDetailsComponent} from './pages/product-details/product-details.component';
import {VerifyUsernameFormComponent} from './pages/verify-username-form/verify-username-form.component';
import {VerifySecurityQuestionsFormComponent} from './pages/verify-security-questions-form/verify-security-questions-form.component';
import {ResetPasswordFormComponent} from './pages/reset-password-form/reset-password-form.component';
import {RegisterComponent} from './pages/register/register.component';
import {ErrorComponent} from './pages/error/error.component';
import {UserProfileComponent} from './pages/user-profile/user-profile.component';
import {RoleListComponent} from './pages/role-list/role-list.component';
import {RoleCreateComponent} from './pages/role-create/role-create.component';
import {RoleDetailsComponent} from './pages/role-details/role-details.component';
import {InvoiceListComponent} from './pages/invoice-list/invoice-list.component';
import {PurchasesByServiceGraphComponent} from './pages/purchases-by-service-graph/purchases-by-service-graph.component';
import {RoleGuard} from './shared/role.guard';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: InvoiceListComponent
      },

      {
        // we may want to change the name of home component
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'users',
        component: UserListComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'users/:userId',
        component: UserDetailsComponent,
        canActivate: [RoleGuard]
      },
      /*       {
              path: 'users/create/new',
              component: UserCreateComponent
            }, */
      {
        path: 'security-questions',
        component: SecurityQuestionListComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'security-questions/:questionId',
        component: SecurityQuestionDetailsComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'security-questions/create/new',
        component: SecurityQuestionCreateComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'roles',
        component: RoleListComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'roles/create/new',
        component: RoleCreateComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'roles/:roleId',
        component: RoleDetailsComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'products',
        component: ProductListComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'products/:productId',
        component: ProductDetailsComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'products/create/new',
        component: ProductCreateComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'profile',
        component: UserProfileComponent
      },
      {
        path: 'purchases-by-service-graph',
        component: PurchasesByServiceGraphComponent,
        canActivate: [RoleGuard]
      }
    ],
    canActivate: [SessionGuard]
  },
  {
    path: 'session',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path: 'not-found',
        component: NotFoundComponent
      },
      {
        path: '500',
        component: ErrorComponent
      },
      {
        path: 'forgot',
        component: VerifyUsernameFormComponent
      },
      {
        path: 'verify-security-questions',
        component: VerifySecurityQuestionsFormComponent
      },
      {
        path: 'reset-password',
        component: ResetPasswordFormComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'session/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
