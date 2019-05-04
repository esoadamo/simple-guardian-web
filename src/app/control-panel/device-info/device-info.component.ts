import {Component, Input, OnInit} from '@angular/core';
import {Device, DeviceBasic, DeviceGetterService} from '../../services/device-getter.service';

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
    if (!device) {
      return;
    }
    this.deviceGetter.getDeviceInfo(device).subscribe(dev => this.selectedDeviceVar = dev);
  }

  ngOnInit() {
    this.deviceGetter.devicesListUpdate.subscribe(data => {
      this.devicesInfo = {
        offline: data.filter(dev => dev.status === 'offline').length,
        needsLinking: data.filter(dev => dev.status === 'not-linked').length,
        total: data.length
      };
      console.log(this.devicesInfo);
    });
  }

}
