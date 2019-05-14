import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Status{
  id: number;
  statusName: string;
}
export interface StatusResponse{
  errorCode: number;
  messege: string;
  data: Status[];
}
export interface StatusDetail{
  errorCode: number;
  messege: string;
  data: Status;
}
@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private api: ApiService, private http: HttpClient) { }
  public getAllStatus():Observable<StatusResponse>{
    return this.http.get<StatusResponse>(this.api.apiUrl.status);
  }

  public add(datas):Observable<StatusDetail>{
    return this.http.post<StatusDetail>(this.api.apiUrl.status, datas);
  }

  public update(datas: Status):Observable<StatusDetail>{
    return this.http.put<StatusDetail>(this.api.apiUrl.status + '/' + datas.id, datas);
  }

  public delete(id):Observable<StatusDetail>{
    return this.http.delete<StatusDetail>(this.api.apiUrl.status + '/' + id);
  }

  public getStatusId(id): Observable<StatusDetail>{
    return this.http.get<StatusDetail>(this.api.apiUrl.status + '/' + id)
  }
}
