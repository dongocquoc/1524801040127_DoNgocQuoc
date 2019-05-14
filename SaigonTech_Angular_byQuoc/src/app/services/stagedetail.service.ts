import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Major } from './major.service';
import { Stage } from './stage.service';
import { ExSubject } from './examsubject.service';

export interface StageDetails{
  id: number;
  starTime: string;
  endTime: string;
  interview: string;
  major_ID: number;
  major: Major;
  stage_ID: number;
  stage: Stage;
  exam_ID: number;
  examSubject: ExSubject;
}

export interface StageDetailsResponse {
  errorCode: number;
  messege: string;
  data: StageDetails[];
}

export interface StageDetaillDetail {
  errorCode: number;
  messege: string;
  data: StageDetails;
}
@Injectable({
  providedIn: 'root'
})
export class StagedetailService {

  constructor(private api: ApiService, private http: HttpClient) { }
  public getAllStageDetail(): Observable<StageDetailsResponse> {
    return this.http.get<StageDetailsResponse>(this.api.apiUrl.stagedetails);
  }

  public getStageDetailId(id): Observable<StageDetaillDetail> {
    return this.http.get<StageDetaillDetail>(this.api.apiUrl.stagedetails + '/' + id);
  }

  public add(datas): Observable<StageDetaillDetail> {
    return this.http.post<StageDetaillDetail>(this.api.apiUrl.stagedetails, datas);
  }

  public update(datas): Observable<StageDetaillDetail> {
    return this.http.put<StageDetaillDetail>(this.api.apiUrl.stagedetails + '/' + datas.id, datas);
  }

  public delete(id): Observable<StageDetaillDetail> {
    return this.http.delete<StageDetaillDetail>(this.api.apiUrl.stagedetails + '/' + id);
  }

  public getStageDetailByStageId(id): Observable<StageDetailsResponse> {
    return this.http.get<StageDetailsResponse>(this.api.apiUrl.stagedetails + '/GetStageDetailByStage/' + id);
  }

  public getMajorInStageDetail(id): Observable<StageDetailsResponse> {
    return this.http.get<StageDetailsResponse>(this.api.apiUrl.stagedetails + '/GetMajorInStageDetail/' + id);
  }

  public getMajorByStage(stage_id): Observable<StageDetailsResponse>{
    return this.http.get<StageDetailsResponse>(this.api.apiUrl.stagedetails + '/GetStageDetailByStageCandidate/' + stage_id);
  }
}
