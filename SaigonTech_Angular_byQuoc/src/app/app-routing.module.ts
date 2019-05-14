import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
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
import { AuthGuard } from './auth.guard';
import { UserComponent } from './dashboard/user/user.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
  {
    canActivate: [AuthGuard],
    path: 'dashboard', component: DashboardComponent,
    children: [
      {path: 'candidate', component: CandidateComponent},
      {path: 'education', component: EducationComponent},
      {path: 'document', component: DocumentComponent},
      {path: 'parameter', component: ParameterComponent},
      {path: 'intake', component: IntakeComponent},
      {path: 'catalog', component: CatalogComponent},
      {path: 'year', component: YearComponent},
      {path: 'semester', component: SemesterComponent},
      {path: 'stage', component: StageComponent},
      {path: 'address', component: AddressComponent},
      {path: 'major', component: MajorComponent},
      {path: 'candidatetype', component: CandidatetypeComponent},
      {path: 'examsubject', component: ExamsubjectComponent},
      {path: 'scoreofexamsubject', component: ScoreofexamsubjectComponent},
      {path: 'stagedetail', component: StagedetailComponent},
      { path: 'user', component: UserComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
