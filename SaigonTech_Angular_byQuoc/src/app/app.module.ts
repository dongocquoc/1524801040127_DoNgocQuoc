import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CookieService  } from 'ngx-cookie-service';
import { AuthGuard } from './auth.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertModule, ButtonsModule, BsDropdownModule, ModalModule } from 'ngx-bootstrap';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CandidateComponent } from './dashboard/candidate/candidate.component';
import { EducationComponent } from './dashboard/education/education.component';
import { DocumentComponent } from './dashboard/document/document.component';
import { ParameterComponent } from './dashboard/parameter/parameter.component';
import { IntakeComponent } from './dashboard/intake/intake.component';
import { CatalogComponent } from './dashboard/catalog/catalog.component';
import { YearComponent } from './dashboard/year/year.component';
import { SemesterComponent } from './dashboard/semester/semester.component';
import { StageComponent } from './dashboard/stage/stage.component';
import { AddressComponent } from './dashboard/address/address.component';
import { MajorComponent } from './dashboard/major/major.component';
import { CandidatetypeComponent } from './dashboard/candidatetype/candidatetype.component';
import { ExamsubjectComponent } from './dashboard/examsubject/examsubject.component';
import { ScoreofexamsubjectComponent } from './dashboard/scoreofexamsubject/scoreofexamsubject.component';
import { StagedetailComponent } from './dashboard/stagedetail/stagedetail.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './dashboard/user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    CandidateComponent,
    EducationComponent,
    DocumentComponent,
    ParameterComponent,
    IntakeComponent,
    CatalogComponent,
    YearComponent,
    SemesterComponent,
    StageComponent,
    AddressComponent,
    MajorComponent,
    CandidatetypeComponent,
    ExamsubjectComponent,
    ScoreofexamsubjectComponent,
    StagedetailComponent,
    LoginComponent,
    UserComponent
  ],
  imports: [
    ModalModule.forRoot(),
    FormsModule,
    HttpClientModule,
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  providers: [
    AuthGuard,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
