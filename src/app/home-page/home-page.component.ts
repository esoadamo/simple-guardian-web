import {Component, OnInit} from '@angular/core';
import {HttpService} from '../services/http.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(public http: HttpService) {
  }

  ngOnInit() {
  }

}
