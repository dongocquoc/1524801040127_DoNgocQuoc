import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EducationsResponse{
  errorCode: number;
  messege: string;
  data: Education[];
}
export interface EducationDetail{
  errorCode: number;
  messege: string;
  data: Education;
}
export interface Education{
  id: number;
  yearName: number;
}
@Injectable({
  providedIn: 'root'
})
export class EducationService {

  constructor(private api: ApiService, private http: HttpClient) { }

  public getAllEducation():Observable<EducationsResponse>{
    return this.http.get<EducationsResponse>(this.api.apiUrl.educations);
  }

  public add(datas: Education):Observable<EducationDetail>{
    return this.http.post<EducationDetail>(this.api.apiUrl.educations, datas);
  }

  public update(datas: Education):Observable<EducationDetail>{
    return this.http.put<EducationDetail>(this.api.apiUrl.educations + '/' + datas.id, datas);
  }

  public delete(id):Observable<EducationDetail>{
    return this.http.delete<EducationDetail>(this.api.apiUrl.educations + '/' + id);
  }

  public getEducationId(id): Observable<EducationDetail>{
    return this.http.get<EducationDetail>(this.api.apiUrl.educations + "/" + id)
  }
}
