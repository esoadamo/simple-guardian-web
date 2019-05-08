import {Component, OnInit} from '@angular/core';
import {HttpService} from '../services/http.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {

  constructor(public http: HttpService) {
  }

  ngOnInit() {
  }

}
