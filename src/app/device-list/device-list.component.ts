import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DeviceBasic, DeviceGetterService} from '../services/device-getter.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {
  protected devices: DeviceBasic[];

  @Output()
  deviceSelected: EventEmitter<DeviceBasic> = new EventEmitter();

  constructor(private deviceGetter: DeviceGetterService) { }

  ngOnInit() {
    this.deviceGetter.getDevices().subscribe(devices => this.devices = devices);
  }

}
