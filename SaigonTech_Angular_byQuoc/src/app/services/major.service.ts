import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MajorsResponse{
  errorCode: number;
  messege: string;
  data: Major[];
}
export interface MajorDetail{
  errorCode: number;
  messege: string;
  data: Major;
}
export interface Major{
  id: number;
  majorName: string;
}
@Injectable({
  providedIn: 'root'
})
export class MajorService {

  constructor(private api: ApiService, private http: HttpClient) { }

  public getAllMajor():Observable<MajorsResponse>{
    return this.http.get<MajorsResponse>(this.api.apiUrl.majors);
  }

  public add(datas: Major):Observable<MajorDetail>{
    return this.http.post<MajorDetail>(this.api.apiUrl.majors, datas);
  }

  public update(datas: Major):Observable<MajorDetail>{
    return this.http.put<MajorDetail>(this.api.apiUrl.majors + '/' + datas.id, datas);
  }

  public delete(id):Observable<MajorDetail>{
    return this.http.delete<MajorDetail>(this.api.apiUrl.majors + '/' + id);
  }

  public getMajorId(id): Observable<MajorDetail>{
    return this.http.get<MajorDetail>(this.api.apiUrl.majors + '/' + id)
  }
}
