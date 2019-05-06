import {Component, Input, OnInit} from '@angular/core';
import {Device, DeviceBasic, DeviceGetterService} from '../../services/device-getter.service';

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.component.html',
  styleUrls: ['./device-info.component.scss']
})
export class DeviceInfoComponent implements OnInit {
  protected selectedDeviceVar: Device;
  protected devicesInfo: { total: number, offline: number, needsLinking: number };
  protected selectedInfoPanel: string;

  constructor(private deviceGetter: DeviceGetterService) {
  }

  @Input()
  set selectedDevice(device: DeviceBasic) {
    if (!device) {
      this.selectedDeviceVar = null;
      return;
    }
    this.deviceGetter.getDeviceInfo(device).subscribe(dev => {
      console.log(dev);
      this.selectedDeviceVar = dev;
    });
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

  formatDate(timestamp: number): string {
    function z(n) {
      return n >= 10 ? n + '' : '0' + n;
    }

    const date = new Date(timestamp * 1000);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}
    ${z(date.getHours())}:${z(date.getMinutes())}:${z(date.getSeconds())}`;
  }

}
