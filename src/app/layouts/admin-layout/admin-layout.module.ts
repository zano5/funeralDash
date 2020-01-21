import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule,ReactiveFormsModule  } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SignoutComponent } from 'src/app/pages/signout/signout.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { PolicyComponent } from '../../pages/policy/policy.component'; 

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TablesComponent,
    TypographyComponent,
    NotificationsComponent,
    SignoutComponent,
    PolicyComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminLayoutModule {}
