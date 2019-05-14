import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface YearsResponse{
  errorCode: number;
  messege: string;
  data: Year[];
}
export interface YearDetail{
  errorCode: number;
  messege: string;
  data: Year;
}

export interface Year{
  id: number;
  yearName: number;
}
@Injectable({
  providedIn: 'root'
})
export class YearService {

  constructor(private api: ApiService, private http: HttpClient) { }

  public getAllYear():Observable<YearsResponse>{
    return this.http.get<YearsResponse>(this.api.apiUrl.years);
  }

  public add(datas: Year):Observable<YearDetail>{
    return this.http.post<YearDetail>(this.api.apiUrl.years, datas);
  }

  public update(datas: Year):Observable<YearDetail>{
    return this.http.put<YearDetail>(this.api.apiUrl.years + '/' + datas.id, datas);
  }

  public delete(id):Observable<YearDetail>{
    return this.http.delete<YearDetail>(this.api.apiUrl.years + '/' + id);
  }

  public getYearId(id): Observable<YearDetail>{
    return this.http.get<YearDetail>(this.api.apiUrl.years + '/' + id);
  }
}
