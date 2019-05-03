import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-warning-div',
  templateUrl: './warning-div.component.html',
  styleUrls: ['./warning-div.component.css']
})
export class WarningDivComponent implements OnInit {

  @Input()
  text: string;

  constructor() {
  }

  ngOnInit() {
  }

}
