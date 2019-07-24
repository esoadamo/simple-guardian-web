import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit, ControlValueAccessor {
  @Input()
  checked = false;

  @Output()
  change = new EventEmitter<boolean>();

  private disabled = false;
  private onTouch = null;
  private onChanged = null;

  constructor() {
  }

  @HostListener('click', ['$event.target'])
  switch() {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.change.emit(this.checked);
      if (this.onTouch) {
        this.onTouch(this.checked);
      }
      if (this.onChanged) {
        this.onChanged(this.checked);
      }
    }
  }

  ngOnInit() {
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(val: boolean): void {
    this.checked = val;
    this.change.emit(this.checked);
  }

}
