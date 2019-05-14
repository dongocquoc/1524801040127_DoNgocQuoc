import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Candidates{
  id: number;
  candidateId: string;
  lastName: string;
  firstName: string;
  dateOfBirth: Date;
  gender: number;
  phone: string;
  homeAddress: string;
  countryAddress: string;
  provinceAddress: string;
  districtAddress: string;
  placeOfBirth: string;
  maritalStatus: number;
  highSchoolName: string;
  highSchoolCity: string;
  graduateYear: number;
  registryDate: Date;
  email: string;
  cardId: string;
  finalResult: boolean;
  documentCode: string;
  stagE_ID: number;
  majoR_ID: number;
  cataloG_ID: number;
  countrY_ID: number;
  educatioN_ID: number;
  yeaR_ID: number;
  typE_ID: number;
  intakE_ID: number;
  seM_ID: number;
}
export interface Candidatesponse{
  errorCode: number;
  messege: string;
  data: Candidates[];
}
export interface CandidateDetail{
  errorCode: number;
  messege: string;
  data: Candidates;
}
@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private api: ApiService, private http: HttpClient) { }
  public getAllCandidate():Observable<Candidatesponse>{
    return this.http.get<Candidatesponse>(this.api.apiUrl.candidates);
  }

  public add(datas):Observable<CandidateDetail>{
    return this.http.post<CandidateDetail>(this.api.apiUrl.candidates, datas);
  }

  public update(datas):Observable<CandidateDetail>{
    return this.http.put<CandidateDetail>(this.api.apiUrl.candidates + '/' + datas.id, datas);
  }

  public delete(id):Observable<CandidateDetail>{
    return this.http.delete<CandidateDetail>(this.api.apiUrl.candidates + '/' + id);
  }

  public getCandidateId(id): Observable<CandidateDetail>{
    return this.http.get<CandidateDetail>(this.api.apiUrl.candidates + '/' + id)
  }

  public getCandidateByStage(id): Observable<Candidatesponse>{
    return this.http.get<Candidatesponse>(this.api.apiUrl.candidates + '/GetCandidateByStage/' + id);
  }
}
