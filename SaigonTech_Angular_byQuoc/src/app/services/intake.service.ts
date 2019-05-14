import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface IntakesResponse{
  errorCode: number;
  messege: string;
  data: Intake[];
}
export interface IntakeDetail{
  errorCode: number;
  messege: string;
  data: Intake;
}
export interface Intake{
  id: number;
  intakeName: number;
}
@Injectable({
  providedIn: 'root'
})
export class IntakeService {

  constructor(private api: ApiService, private http: HttpClient) { }

  public getAllIntake():Observable<IntakesResponse>{
    return this.http.get<IntakesResponse>(this.api.apiUrl.intakes);
  }

  public add(datas: Intake):Observable<IntakeDetail>{
    return this.http.post<IntakeDetail>(this.api.apiUrl.intakes, datas);
  }

  public update(datas: Intake):Observable<IntakeDetail>{
    return this.http.put<IntakeDetail>(this.api.apiUrl.intakes + '/' + datas.id, datas);
  }

  public delete(id):Observable<IntakeDetail>{
    return this.http.delete<IntakeDetail>(this.api.apiUrl.intakes + '/' + id);
  }

  public getIntakeId(id): Observable<IntakeDetail>{
    return this.http.get<IntakeDetail>(this.api.apiUrl.intakes + "/" + id)
  }
}
