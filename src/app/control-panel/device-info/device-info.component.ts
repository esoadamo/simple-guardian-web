import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Device, DeviceBasic, DeviceGetterService} from '../../services/device-getter.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.component.html',
  styleUrls: ['./device-info.component.scss']
})
export class DeviceInfoComponent implements OnInit, OnDestroy {
  selectedDeviceVar: Device;
  devicesInfo: { total: number, offline: number, needsLinking: number };
  selectedInfoPanel: string;

  constructor(public deviceGetter: DeviceGetterService, public router: Router) {
  }

  @Input()
  set selectedDevice(device: DeviceBasic) {
    if (!device) {
      this.selectedDeviceVar = null;
      return;
    }
    this.deviceGetter.getDeviceInfo(device).subscribe(dev => {
      this.selectedDeviceVar = dev;
      this.selectedDeviceVar.attacks.sort((a, b) => b.time - a.time);
      this.selectedDeviceVar.bans.sort((a, b) => b.time - a.time);
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

  ngOnDestroy() {
    this.deviceGetter.autorefresh = false;
  }

  refresh() {
    this.deviceGetter.getDeviceInfo(this.selectedDeviceVar).subscribe(device => this.selectedDeviceVar = device);
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
