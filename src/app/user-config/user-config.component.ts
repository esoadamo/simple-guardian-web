import {Component, OnInit} from '@angular/core';
import {HttpService} from '../services/http.service';
import {Router} from '@angular/router';
import {PasswordCheckService} from './password-check/password-check.service';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.scss']
})
export class UserConfigComponent implements OnInit {

  constructor(public http: HttpService, private router: Router, private passwordCheck: PasswordCheckService) {
  }

  ngOnInit() {
    // Check if user is logged in
    if (this.http.username.length === 0) {
      this.http.getUsername().subscribe(username => {
        if (username.length === 0) {
          // noinspection JSIgnoredPromiseFromCall
          this.router.navigate(['/login']);
        }
      });
    }
  }

  changePassword() {
    this.passwordCheck.show().subscribe(status => {
      console.log('password status');
      console.log(status);
    });
  }
}
