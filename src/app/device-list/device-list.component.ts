import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DeviceBasic, DeviceGetterService} from '../services/device-getter.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {
  protected devices: DeviceBasic[];
  protected selectedDeviceVar: DeviceBasic;

  set selectedDevice(device: DeviceBasic) {
    this.selectedDeviceVar = device;
    this.deviceSelected.emit(device);
  }

  @Output()
  deviceSelected: EventEmitter<DeviceBasic> = new EventEmitter();

  constructor(private deviceGetter: DeviceGetterService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.selectedDevice = {id: this.route.snapshot.paramMap.get('id'), name: 'unknown', status: 'unknown'};
    this.deviceGetter.getDevices().subscribe(devices => {
      this.devices = devices;
      // Update selected device
      if (this.selectedDeviceVar) {
        this.selectedDevice = this.devices.filter(d => d.id === this.selectedDeviceVar.id)[0];
      }
    });
  }

}
