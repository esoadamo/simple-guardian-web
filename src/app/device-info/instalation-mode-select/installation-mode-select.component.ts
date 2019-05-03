import {Component, Input, OnInit} from '@angular/core';
import {DeviceBasic} from '../../services/device-getter.service';

@Component({
  selector: 'app-instalation-mode-select',
  templateUrl: './installation-mode-select.component.html',
  styleUrls: ['./installation-mode-select.component.scss']
})
export class InstallationModeSelectComponent implements OnInit {
  protected option: string;
  protected apiUrl: string;

  protected username = 'mockUsername';

  @Input()
  protected selectedDevice: DeviceBasic;

  constructor() {
  }

  ngOnInit() {
    this.apiUrl = `${window.location.protocol}://${window.location.hostname}/api`;
  }

}
