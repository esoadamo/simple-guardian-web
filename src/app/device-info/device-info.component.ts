import {Component, Input, OnInit} from '@angular/core';
import {Device, DeviceBasic, DeviceGetterService} from '../services/device-getter.service';

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.component.html',
  styleUrls: ['./device-info.component.css']
})
export class DeviceInfoComponent implements OnInit {
  protected selectedDeviceVar: Device;
  protected devicesInfo: {total: number, offline: number, needsLinking: number};

  constructor(private deviceGetter: DeviceGetterService) { }

  @Input()
  set selectedDevice(device: DeviceBasic) {
    this.selectedDeviceVar = null;
    this.deviceGetter.getDeviceInfo(device).subscribe(dev => this.selectedDeviceVar = dev);
  }

  ngOnInit() {
    setInterval(this.updateDevicesInfo, 30000);
    this.updateDevicesInfo();
  }

  updateDevicesInfo() {
    this.deviceGetter.getDevices().subscribe(data => {
      this.devicesInfo = {
        offline: data.filter(dev => dev.status === 'offline').length,
        needsLinking: data.filter(dev => dev.status === 'not-linked').length,
        total: data.length
      };
    });
  }

}
