import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CdTypesResponse{
  errorCode: number;
  messege: string;
  data: CdType[];
}
export interface CdTypeDetail{
  errorCode: number;
  messege: string;
  data: CdType;
}
export interface CdType{
  id: number;
  typeName: string;
}
@Injectable({
  providedIn: 'root'
})
export class CandidatetypeService {

  constructor(private api: ApiService, private http: HttpClient) { }

  public getAllCdType():Observable<CdTypesResponse>{
    return this.http.get<CdTypesResponse>(this.api.apiUrl.candidatetypes);
  }

  public add(datas: CdType):Observable<CdTypeDetail>{
    return this.http.post<CdTypeDetail>(this.api.apiUrl.candidatetypes, datas);
  }

  public update(datas: CdType):Observable<CdTypeDetail>{
    return this.http.put<CdTypeDetail>(this.api.apiUrl.candidatetypes + '/' + datas.id, datas);
  }

  public delete(id):Observable<CdTypeDetail>{
    return this.http.delete<CdTypeDetail>(this.api.apiUrl.candidatetypes + '/' + id);
  }

  public getCdTypeId(id): Observable<CdTypeDetail>{
    return this.http.get<CdTypeDetail>(this.api.apiUrl.candidatetypes + '/' + id)
  }
}
