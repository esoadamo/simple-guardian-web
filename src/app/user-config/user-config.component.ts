import {Component, OnInit} from '@angular/core';
import {HttpService} from '../services/http.service';
import {Router} from '@angular/router';
import {PasswordCheckService} from './password-check/password-check.service';
import {BalloonMessageFactoryService} from '../balloon-message/balloon-message-factory.service';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.scss']
})
export class UserConfigComponent implements OnInit {
  newPassword = '';
  newPasswordRepeat = '';

  federatedBlocklist = false;

  constructor(public http: HttpService, private router: Router, private passwordCheck: PasswordCheckService,
              private balloon: BalloonMessageFactoryService) {
  }

  ngOnInit() {
    this.http.get('/api/user/isOn/federatedSharing').subscribe(r => {
      if (r) {
        this.federatedBlocklist = r.on;
      }
    });
  }

  sendFederatedBlocklistStatus(status) {
    this.http.post('/api/user/isOn/federatedSharing', {on: status}).subscribe(r => {
      if (r) {
        this.balloon.show('Status changed', 'success');
      }
    });
  }

  changePassword() {
    if (!this.newPassword.length || this.newPasswordRepeat !== this.newPassword) {
      this.balloon.show('New password is incorrect', 'error');
      return;
    }
    this.passwordCheck.show().subscribe(status => {
      if (status) {
        this.http.changePassword(this.newPassword).subscribe(status2 => {
          if (status2) {
            this.balloon.show('Password changed', 'success');
            this.newPassword = this.newPasswordRepeat = '';
          }
        });
      }
    });
  }

  deleteUser() {
    this.passwordCheck.show().subscribe(status => {
      if (status) {
        this.http.get('/api/user/delete').subscribe(status2 => {
          if (status2) {
            this.balloon.show('Bye', 'success');
            this.http.logout();
          }
        });
      }
    });
  }
}
