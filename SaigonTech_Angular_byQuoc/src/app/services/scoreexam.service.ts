import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExSubject } from './examsubject.service';
import { Major } from './major.service';

export interface ScoreExam{
  id: number;
  sumScore: number;
  scorePass: number;
  exaM_ID: number;
  examSubject: ExSubject;
  majoR_ID: number;
  major: Major;
}
export interface ScoreExamsponse{
  errorCode: number;
  messege: string;
  data: ScoreExam[];
}
export interface ScoreExamDetail{
  errorCode: number;
  messege: string;
  data: ScoreExam;
}
@Injectable({
  providedIn: 'root'
})
export class ScoreexamService {

  constructor(private api: ApiService, private http: HttpClient) { }
  public getAllScoreExam():Observable<ScoreExamsponse>{
    return this.http.get<ScoreExamsponse>(this.api.apiUrl.scoreexams);
  }

  public add(datas):Observable<ScoreExamDetail>{
    return this.http.post<ScoreExamDetail>(this.api.apiUrl.scoreexams, datas);
  }

  public update(datas):Observable<ScoreExamDetail>{
    return this.http.put<ScoreExamDetail>(this.api.apiUrl.scoreexams + '/' + datas.id, datas);
  }

  public delete(id):Observable<ScoreExamDetail>{
    return this.http.delete<ScoreExamDetail>(this.api.apiUrl.scoreexams + '/' + id);
  }

  public getScoreExamId(id): Observable<ScoreExamDetail>{
    return this.http.get<ScoreExamDetail>(this.api.apiUrl.scoreexams + '/' + id)
  }
}
