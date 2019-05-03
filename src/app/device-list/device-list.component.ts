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
    const selectedID = this.route.snapshot.paramMap.get('id');
    if (selectedID) {
      console.log('getting device info');
      this.selectedDevice = {id: selectedID, name: 'unknown', status: 'unknown'};
    }
    this.deviceGetter.getDevices().subscribe(devices => {
      this.devices = devices;
      // Update selected device
      if (this.selectedDeviceVar) {
        console.log('ye');
        this.selectedDevice = this.devices.filter(d => d.id === this.selectedDeviceVar.id)[0];
      }
    });
  }

}
