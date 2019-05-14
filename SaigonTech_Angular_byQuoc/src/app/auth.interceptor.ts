import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private cookieService: CookieService){}

    intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
        const token: string = this.cookieService.get('token');
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });
        request = request.clone({
            headers: headers
        });
        return next.handle(request).pipe();
    }
}