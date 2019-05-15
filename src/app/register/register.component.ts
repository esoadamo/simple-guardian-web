import {Component, OnInit} from '@angular/core';
import {BalloonMessageFactoryService} from '../balloon-message/balloon-message-factory.service';
import {HttpService} from '../services/http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email = '';
  password = '';
  passwordRepeat = '';

  constructor(private balloon: BalloonMessageFactoryService, private http: HttpService, private router: Router) {
  }

  ngOnInit() {
  }

  register() {
    if (this.password !== this.passwordRepeat) {
      this.balloon.show('Passwords are not the same', 'error');
    }

    this.http.post('/api/user/register', {mail: this.email, password: this.password}).subscribe(resp => {
      switch (resp.register) {
        case 'ok':
          this.balloon.show('Registered successfully', 'success');
          this.http.authSecret = resp.key;
          // noinspection JSIgnoredPromiseFromCall
          this.router.navigate(['/control']);
          break;
        case 'error':
          this.balloon.show(resp.message, 'error');
          break;
        default:
          this.balloon.show('Server error', 'error');
      }
    });
  }

}
