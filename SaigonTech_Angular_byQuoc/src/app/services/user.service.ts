import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChangePasswordResponse {
  errorCode: number;
  messege: string;
}

export interface ChangePasswordRequest {
  id: number;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface LoginResponse {
  errorCode: number;
  data: LoginInfo;
  messege: string;
}
export interface LoginInfo {
  id: number;
  userName: string;
  token: string;
}


export interface Userepones {
  errorCode: number;
  data: User[];
  messege: string;
}

export interface Userepone {
  errorCode: number;
  data: User;
  messege: string;
}

export interface User {
  id: number;
  name: string;
  phone: number;
  Addres: string;
  email: string;
  userName: string;
  passWord: string;
  status: number;
  imagePath: string;

}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private api: ApiService, private http: HttpClient) { }

  login(userName: string, passWord: string): Observable<LoginResponse> {
    const requestData = {
      username: userName,
      password: passWord
    };
    return this.http.post<LoginResponse>(this.api.apiUrl.login + '/login', requestData);
  }


  getAll(): Observable<Userepones> {
    return this.http.get<Userepones>(this.api.apiUrl.user);
  }

  getObject(id: number): Observable<Userepone> {
    return this.http.get<Userepone>(this.api.apiUrl.user + '/' + id);
  }

  add(user: FormData): Observable<Userepone> {
    return this.http.post<Userepone>(this.api.apiUrl.user, user);

  }

  update(id: number, user: FormData, role: string): Observable<Userepone> {

    return this.http.put<Userepone>(this.api.apiUrl.user + '/' + id + '?role=' + role, user);
  }

  getAcount(id: number): Observable<User> {
    return this.http.get<User>(this.api.apiUrl.user + '/LoadAcount' + '?id=' + id);
  }

  changePassword(id: number, currentpassword: string, newpassword: string, confirmpassword: string): Observable<ChangePasswordResponse> {
    const PasswordData = {
      currentPassword: currentpassword,
      newPassword: newpassword,
      confirmPassword: confirmpassword
    };
    return this.http.put<ChangePasswordResponse>(this.api.apiUrl.user + '/ChangePassword/' + id, PasswordData);
  }

}
