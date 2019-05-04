import {Component, Input, OnInit} from '@angular/core';
import {DeviceBasic, DeviceGetterService} from '../../../services/device-getter.service';
import {HttpService} from '../../../services/http.service';

@Component({
  selector: 'app-instalation-mode-select',
  templateUrl: './installation-mode-select.component.html',
  styleUrls: ['./installation-mode-select.component.scss']
})
export class InstallationModeSelectComponent implements OnInit {
  protected option: string;

  @Input()
  protected selectedDevice: DeviceBasic;

  constructor(private deviceGetter: DeviceGetterService, private http: HttpService) {
  }

  ngOnInit() {
  }

}
