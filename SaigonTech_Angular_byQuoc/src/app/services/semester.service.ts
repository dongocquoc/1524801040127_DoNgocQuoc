import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SemestersResponse {
  errorCode: number;
  messege: string;
  data: Semester[];
}

export interface SemesterDetail {
  errorCode: number;
  messege: string;
  data: Semester;
}

export interface Semester {
  id: number;
  semesterName: string;
}
@Injectable({
  providedIn: 'root'
})
export class SemesterService {

  constructor(private api: ApiService, private http: HttpClient) { }

  public getAllSemester(): Observable<SemestersResponse> {
    return this.http.get<SemestersResponse>(this.api.apiUrl.semesters);
  }

  public add(datas: Semester): Observable<SemesterDetail> {
    return this.http.post<SemesterDetail>(this.api.apiUrl.semesters, datas);
  }

  public update(datas: Semester): Observable<SemesterDetail> {
    return this.http.put<SemesterDetail>(this.api.apiUrl.semesters + '/' + datas.id, datas);
  }

  public delete(id): Observable<SemesterDetail> {
    return this.http.delete<SemesterDetail>(this.api.apiUrl.semesters + '/' + id);
  }

  public getSemesterId(id): Observable<SemesterDetail> {
    return this.http.get<SemesterDetail>(this.api.apiUrl.semesters + '/' + id);
  }
}
