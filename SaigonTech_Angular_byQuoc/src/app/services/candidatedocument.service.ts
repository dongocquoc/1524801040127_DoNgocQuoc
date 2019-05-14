import { Injectable } from '@angular/core';
import { Documents } from './document.service';
import { Candidates } from './candidate.service';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CandidateDocument{
  id: number;
  note: string;
  doC_ID: number;
  document: Documents;
  c_ID: number;
  candidate: Candidates;
}
export interface CandidateDocumentsResponse {
  errorCode: number;
  messege: string;
  data: CandidateDocument[];
}
export interface CandidateDocumentDetail {
  errorCode: number;
  messege: string;
  data: CandidateDocument;
}
@Injectable({
  providedIn: 'root'
})
export class CandidatedocumentService {

  constructor(private api: ApiService, private http: HttpClient) { }

  public getAllCandidateDocument(): Observable<CandidateDocumentsResponse>{
    return this.http.get<CandidateDocumentsResponse>(this.api.apiUrl.candidatedocuments);
  }
  public add(datas): Observable<CandidateDocumentDetail> {
    return this.http.post<CandidateDocumentDetail>(this.api.apiUrl.candidatedocuments, datas);
  }

  public update(datas: CandidateDocument, status): Observable<CandidateDocumentDetail> {
    return this.http.put<CandidateDocumentDetail>(this.api.apiUrl.candidatedocuments + '/' + datas.id, datas);
  }

  public delete(id): Observable<CandidateDocumentDetail> {
    return this.http.delete<CandidateDocumentDetail>(this.api.apiUrl.candidatedocuments + '/' + id);
  }

  public getcandidateDocumentById(id): Observable<CandidateDocumentDetail> {
    return this.http.get<CandidateDocumentDetail>(this.api.apiUrl.candidatedocuments + '/' + id)
  }

  public GetcandidateDocumentBycandidate(can_id): Observable<CandidateDocumentsResponse> {
    return this.http.get<CandidateDocumentsResponse>(this.api.apiUrl.candidatedocuments + '/GetDocumentByCandidate/' + can_id);
  }
}
