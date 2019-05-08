import {Component, OnInit} from '@angular/core';
import {DeviceBasic} from '../services/device-getter.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {
  selectedDevice: DeviceBasic;

  constructor() { }

  ngOnInit() {
  }

  onDeviceSelected(device: DeviceBasic) {
    this.selectedDevice = device;
  }

}
