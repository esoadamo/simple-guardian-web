import {Component, OnInit} from '@angular/core';
import {HttpService} from '../services/http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {

  constructor(public http: HttpService, public router: Router) {
  }

  ngOnInit() {
    if (this.http.userID === 0) {
      this.http.getUsername().subscribe();
    }
  }

}
