import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message = '';
  username = '';
  password = '';
  constructor(private userServices: UserService, private router: Router, private auth: AuthService, private cookieService: CookieService) { }

  ngOnInit() {
  }

  login(){
    this.userServices.login(this.username, this.password).subscribe(result =>{
      console.log(result);
      if(result.errorCode !== 1){
        this.message = result.messege;
      }else{
        alert(result.messege);
        this.message = result.messege;
        this.auth.setLoggedIn(true);
        localStorage.setItem('id', result.data.id.toString());
        localStorage.setItem('username', result.data.userName);
        //save token (npm install ngx-cookie-service --save)
        this.cookieService.set('Id', result.data.id + '');
        this.cookieService.set('token', result.data.token);
        this.router.navigate(['/dashboard']);
      }
    })
  }
}
