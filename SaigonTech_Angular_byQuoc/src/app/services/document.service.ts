import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Documents{
  id: number;
  nameInEnglish: string;
  nameInVietnamese: string;
  sequenceNumber: number;
  note: string;
  inputtype: number;
  status: number;
}

export interface DocumentsResponse{
  errorCode: number;
  messege: string;
  data: Documents[];
}

export interface DocumentDetail{
  errorCode: number;
  messege: string;
  data: Documents;
}
@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private api: ApiService, private http: HttpClient) { }

  public getAllDocument():Observable<DocumentsResponse>{
    return this.http.get<DocumentsResponse>(this.api.apiUrl.documents);
  }

  public add(datas):Observable<DocumentDetail>{
    return this.http.post<DocumentDetail>(this.api.apiUrl.documents, datas);
  }

  public update(datas: Documents):Observable<DocumentDetail>{
    return this.http.put<DocumentDetail>(this.api.apiUrl.documents + '/' + datas.id, datas);
  }

  public delete(id):Observable<DocumentDetail>{
    return this.http.delete<DocumentDetail>(this.api.apiUrl.documents + '/' + id);
  }

  public getDocumentId(id): Observable<DocumentDetail>{
    return this.http.get<DocumentDetail>(this.api.apiUrl.documents + '/' + id)
  }
}
