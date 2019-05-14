import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface InputType{
  id: number;
  inputName: string;
}
export interface InputTypeResponse{
  errorCode: number;
  messege: string;
  data: InputType[];
}
export interface InputTypeDetail{
  errorCode: number;
  messege: string;
  data: InputType;
}
@Injectable({
  providedIn: 'root'
})
export class InputtypeService {

  constructor(private api: ApiService, private http: HttpClient) { }

  public getAllInput():Observable<InputTypeResponse>{
    return this.http.get<InputTypeResponse>(this.api.apiUrl.inputtypes);
  }

  public add(datas):Observable<InputTypeDetail>{
    return this.http.post<InputTypeDetail>(this.api.apiUrl.inputtypes, datas);
  }

  public update(datas: InputType):Observable<InputTypeDetail>{
    return this.http.put<InputTypeDetail>(this.api.apiUrl.inputtypes + '/' + datas.id, datas);
  }

  public delete(id):Observable<InputTypeDetail>{
    return this.http.delete<InputTypeDetail>(this.api.apiUrl.inputtypes + '/' + id);
  }

  public getInputId(id): Observable<InputTypeDetail>{
    return this.http.get<InputTypeDetail>(this.api.apiUrl.inputtypes + '/' + id)
  }
}
