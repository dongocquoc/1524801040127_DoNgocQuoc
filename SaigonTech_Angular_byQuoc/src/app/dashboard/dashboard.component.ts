import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as jwtDecode from 'jwt-decode';
import { UserService, User} from '../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ModalDirective } from 'ngx-bootstrap';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('ModalChangePassword') public modalChangePassword: ModalDirective;
  currentpassword = '';
  newpassword = '';
  confirmpassword = '';
  message = '';

  constructor(private cookieService: CookieService, private userService: UserService, private router: Router, private auth: AuthService) { }
  public decoded: any;
  public claim: any;
  public statusClaim = null;
  public  user: User = {} as User;
  ngOnInit() {
    this.getClaim();
    // hỏi ông thầy chỗ này
    // tslint:disable-next-line:radix
    this.infomationAcount(parseInt( localStorage.getItem('id')));
    console.log(this.user.userName);
  }

  getClaim() {
    this.decoded = this.getDecodedAccessToken(this.cookieService.get('token'));
    console.log(this.decoded);

    this.claim = this.decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    if (this.claim === 'admin') {
      console.log('1');
    } else {
      console.log('2');
      this.statusClaim = '';
      console.log(this.statusClaim);
    }

  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }

  infomationAcount(id: number) {
    this.userService.getAcount(id).subscribe(acount => {
      this.user = acount;
      console.log(this.user);
    });

  }

  logOut() {
    localStorage.setItem('id', '');
    localStorage.setItem('loggedIn', '');
    this.cookieService.delete('token');
    this.cookieService.delete('Id');
    if ( localStorage.getItem('loggedIn') === '') {
      this.router.navigate(['/login']);
    }
  }

  // CODE BY HOA
  changePassword() {
    this.userService.changePassword(this.user.id, this.currentpassword, this.newpassword, this.confirmpassword).subscribe(result => {
      if (result.errorCode !== 0) {
        this.message = result.messege;
        console.log(this.currentpassword, this.newpassword, this.confirmpassword, result.messege);
      }

      if (result.errorCode === 0) {
        this.message = result.messege;
        close();
      }

    });
  }

  showModalChangePassword() {
    this.modalChangePassword.show();
  }

  close() {
    this.modalChangePassword.hide();
  }
}
