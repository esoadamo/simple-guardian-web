import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  @Input()
  question: string;

  @Input()
  respond: string;

  @Output()
  submitted: EventEmitter<string | null> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  submit(cancel = false) {
    this.submitted.emit(cancel ? null : this.respond);
  }
}
