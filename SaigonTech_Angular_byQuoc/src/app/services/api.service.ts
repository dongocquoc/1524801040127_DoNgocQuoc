import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  baseUrl = 'https://localhost:44332/api/';
  apiUrl = {
    years: this.baseUrl + 'years',
    semesters: this.baseUrl + 'semesters',
    educations: this.baseUrl + 'educations',
    intakes: this.baseUrl + 'intakes',
    candidatetypes: this.baseUrl + 'candidatetypes',
    majors: this.baseUrl + 'majors',
    login: this.baseUrl + 'users',
    examsubjects: this.baseUrl + 'examsubjects',
    catalogs: this.baseUrl + 'catalog',
    countries: this.baseUrl + 'countries',
    provinces: this.baseUrl + 'provinces',
    districts: this.baseUrl + 'districts',
    stages: this.baseUrl + 'stages',
    parameter: this.baseUrl + 'Parameter',
    documents: this.baseUrl + 'documents',
    inputtypes: this.baseUrl + 'inputtypes',
    status: this.baseUrl + 'status',
    scoreexams: this.baseUrl + 'scoreexams',
    stagedetails: this.baseUrl + 'stagedetails',
    candidates: this.baseUrl + 'candidates',
    user: this.baseUrl + 'Users',
    candidatedocuments: this.baseUrl + 'candidatedocuments'
  };
}
