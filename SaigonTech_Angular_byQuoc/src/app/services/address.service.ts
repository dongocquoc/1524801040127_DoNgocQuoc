import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Country
export interface Countries{
  id: number;
  countryName: string;
}

export interface CountriesResponse{
  errorCode: number;
  messege: string;
  data: Countries[];
}

export interface CountriesDetail{
  errorCode: number;
  messege: string;
  data: Countries;
}

// Province
export interface Provinces{
  id: number;
  provinceName: string;
  country: Countries;
}

export interface ProvincesResponse{
  errorCode: number;
  messege: string;
  data: Provinces[];
}

export interface ProvinceDetail{
  errorCode: number;
  messege: string;
  data: Provinces;
}

// District
export interface District{
  id: number;
  districtName: string;
  province: Provinces;
}
export interface DistrictsResponse{
  errorCode: number;
  messege: string;
  data: District[];
}

export interface DistrictDetail{
  errorCode: number;
  messege: string;
  data: District;
}
@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private api: ApiService, private http: HttpClient) { }

  // Event Country
  public getAllCountry():Observable<CountriesResponse>{
    return this.http.get<CountriesResponse>(this.api.apiUrl.countries);
  }

  public addCountry(datas: Countries):Observable<CountriesDetail>{
    return this.http.post<CountriesDetail>(this.api.apiUrl.countries, datas);
  }

  public updateCountry(datas: Countries):Observable<CountriesDetail>{
    return this.http.put<CountriesDetail>(this.api.apiUrl.countries + '/' + datas.id, datas);
  }

  public deleteCountry(id):Observable<CountriesDetail>{
    return this.http.delete<CountriesDetail>(this.api.apiUrl.countries + '/' + id);
  }

  public getCountryId(id):Observable<CountriesDetail>{
    return this.http.get<CountriesDetail>(this.api.apiUrl.countries + "/" + id);
  }

  // Event Province
  public getAllProvince():Observable<ProvincesResponse>{
    return this.http.get<ProvincesResponse>(this.api.apiUrl.provinces);
  }

  public getProvinceByCountry(country_id):Observable<ProvincesResponse>{
    return this.http.get<ProvincesResponse>(this.api.apiUrl.provinces + '/GetProvinceByCountry/' + country_id);
  }

  public addProvince(datas):Observable<ProvinceDetail>{
    return this.http.post<ProvinceDetail>(this.api.apiUrl.provinces, datas);
  }

  public updateProvince(datas: Provinces):Observable<ProvinceDetail>{
    return this.http.put<ProvinceDetail>(this.api.apiUrl.provinces + '/' + datas.id, datas);
  }

  public deleteProvince(id):Observable<ProvinceDetail>{
    return this.http.delete<ProvinceDetail>(this.api.apiUrl.provinces + '/' + id);
  }

  public getProvinceId(id):Observable<ProvinceDetail>{
    return this.http.get<ProvinceDetail>(this.api.apiUrl.provinces + "/" + id);
  }

  // Event District
  public getAllDistrict():Observable<DistrictsResponse>{
    return this.http.get<DistrictsResponse>(this.api.apiUrl.districts);
  }

  public getDistrictByProvince(province_id):Observable<DistrictsResponse>{
    return this.http.get<DistrictsResponse>(this.api.apiUrl.districts + '/GetDistrictByProvince/' + province_id);
  }

  public addDistrict(datas):Observable<DistrictDetail>{
    return this.http.post<DistrictDetail>(this.api.apiUrl.districts, datas);
  }

  public updateDistrict(datas: District):Observable<DistrictDetail>{
    return this.http.put<DistrictDetail>(this.api.apiUrl.districts + '/' + datas.id, datas);
  }

  public deleteDistrict(id):Observable<DistrictDetail>{
    return this.http.delete<DistrictDetail>(this.api.apiUrl.districts + '/' + id);
  }

  public getDistrictId(id):Observable<DistrictDetail>{
    return this.http.get<DistrictDetail>(this.api.apiUrl.districts + "/" + id);
  }
}
