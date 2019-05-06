import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-password-check',
  templateUrl: './password-check.component.html',
  styleUrls: ['./password-check.component.css']
})
export class PasswordCheckComponent implements OnInit {
  @Output()
  submitted: EventEmitter<string | null> = new EventEmitter();
  protected password = '';

  constructor() {
  }

  ngOnInit() {
  }

  submit(cancel = false) {
    this.submitted.emit(cancel ? null : this.password);
  }

}
