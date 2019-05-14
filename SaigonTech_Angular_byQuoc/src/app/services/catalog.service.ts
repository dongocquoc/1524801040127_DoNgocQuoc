import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CatalogsResponse{
  errorCode: number;
  messege: string;
  data: Catalog[];
}

export interface CatalogDetail{
  errorCode: number;
  messege: string;
  data: Catalog;
}

export interface Catalog{
  id: number;
  beginYear: number;
  endYear: number;
}
@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private api: ApiService, private http: HttpClient) { }

  public getAllCatalog():Observable<CatalogsResponse>{
    return this.http.get<CatalogsResponse>(this.api.apiUrl.catalogs);
  }

  public add(datas: Catalog):Observable<CatalogDetail>{
    return this.http.post<CatalogDetail>(this.api.apiUrl.catalogs, datas);
  }

  public update(datas: Catalog):Observable<CatalogDetail>{
    return this.http.put<CatalogDetail>(this.api.apiUrl.catalogs + '/' + datas.id, datas);
  }

  public delete(id):Observable<CatalogDetail>{
    return this.http.delete<CatalogDetail>(this.api.apiUrl.catalogs + '/' + id);
  }

  public getCatalogId(id):Observable<CatalogDetail>{
    return this.http.get<CatalogDetail>(this.api.apiUrl.catalogs + "/" + id);
  }
}
