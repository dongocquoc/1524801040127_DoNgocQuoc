import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Semester {
  id: number;
  semesterName: string;
}

export interface Year {
  id: number;
  yearName: number;
}

export interface Stage {
  id: number;
  stageName: string;
  dateTimes: Date;
  examDate: Date;
  examTime: string;
  englishTimeExam: string;
  seM_ID: number;
  semester: Semester;
  yeaR_ID: number;
  year: Year;
}

export interface StagesResponse {
  errorCode: number;
  messege: string;
  data: Stage[];
}
export interface StageDetail {
  errorCode: number;
  messege: string;
  data: Stage;
}
@Injectable({
  providedIn: 'root'
})
export class StageService {

  constructor(private api: ApiService, private http: HttpClient) { }
  public getAllStage(): Observable<StagesResponse> {
    return this.http.get<StagesResponse>(this.api.apiUrl.stages);
  }

  public GetStageBySemester(sem_id): Observable<StagesResponse> {
    return this.http.get<StagesResponse>(this.api.apiUrl.stages + '/GetStageBySemester/' + sem_id);
  }

  public GetStageByYear(year_id):Observable<StagesResponse>{
    return this.http.get<StagesResponse>(this.api.apiUrl.stages + '/GetStageByYear/' + year_id);
  }

  public add(datas): Observable<StageDetail> {
    return this.http.post<StageDetail>(this.api.apiUrl.stages, datas);
  }

  public update(datas: Stage): Observable<StageDetail> {
    return this.http.put<StageDetail>(this.api.apiUrl.stages + '/' + datas.id, datas);
  }

  public delete(id): Observable<StageDetail> {
    return this.http.delete<StageDetail>(this.api.apiUrl.stages + '/' + id);
  }

  public getStageId(id): Observable<StageDetail> {
    return this.http.get<StageDetail>(this.api.apiUrl.stages + '/' + id)
  }
}
