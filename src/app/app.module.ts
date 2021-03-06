import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout'; 
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { ConfirmDialogComponent } from './pages/confirm-dialog/confirm-dialog.component';
import { Confirm2Component } from './pages/confirm2/confirm2.component';
import { DeleteComponent } from './pages/delete/delete.component';
import { Delete1Component } from './pages/delete1/delete1.component';
import { ViewPurchaseComponent } from './pages/view-purchase/view-purchase.component';
import { ViewClaimComponent } from './pages/view-claim/view-claim.component'; 



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    AngularMaterialModule, 
    ReactiveFormsModule ,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule, 
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent, SignInComponent, SignUpComponent, ConfirmDialogComponent, Confirm2Component, DeleteComponent, Delete1Component, ViewPurchaseComponent, ViewClaimComponent],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    ConfirmDialogComponent,
    Confirm2Component,
    DeleteComponent,
    Delete1Component,
    ViewPurchaseComponent,
    ViewClaimComponent
  ]
})
export class AppModule {}
