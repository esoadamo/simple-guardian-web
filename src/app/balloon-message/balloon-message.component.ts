import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-balloon-message',
  templateUrl: './balloon-message.component.html',
  styleUrls: ['./balloon-message.component.css']
})
export class BalloonMessageComponent implements OnInit {
  @Input()
  message: string;

  constructor() {
  }

  ngOnInit() {
  }

}
