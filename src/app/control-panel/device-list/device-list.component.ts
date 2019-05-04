import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DeviceBasic, DeviceGetterService} from '../../services/device-getter.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../dialog/dialog.service';
import {BalloonMessageFactoryService} from '../../balloon-message/balloon-message-factory.service';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {
  protected devicesOnline: DeviceBasic[];
  protected devicesOffline: DeviceBasic[];
  protected devicesNotLinked: DeviceBasic[];
  protected selectedDeviceVar: DeviceBasic;

  set selectedDevice(device: DeviceBasic) {
    this.selectedDeviceVar = device;
    this.deviceSelected.emit(device);
  }

  @Output()
  deviceSelected: EventEmitter<DeviceBasic> = new EventEmitter();

  constructor(private deviceGetter: DeviceGetterService, private route: ActivatedRoute, private dialogCreator: DialogService,
              private balloonMessage: BalloonMessageFactoryService, private http: HttpService, private router: Router) {
  }

  ngOnInit() {
    const selectedID = this.route.snapshot.paramMap.get('id');
    if (selectedID) {
      this.selectedDevice = {id: selectedID, name: 'unknown', status: 'unknown'};
    }
    this.deviceGetter.devicesListUpdate.subscribe(devices => {
      console.log(devices);
      // Update selected device
      if (this.selectedDeviceVar) {
        this.selectedDevice = devices.filter(d => d.id === this.selectedDeviceVar.id)[0] || null;
      }
      this.devicesOffline = devices.filter(d => d.status === 'offline');
      this.devicesOnline = devices.filter(d => d.status === 'online');
      this.devicesNotLinked = devices.filter(d => d.status === 'not-linked');
    });
    this.deviceGetter.getDevices();
  }

  addNewDevice() {
    console.log(this.dialogCreator);
    this.dialogCreator.show('Enter the name of your new device:').subscribe(deviceName => {
      this.http.post('/api/device/create', {name: deviceName}).subscribe(resp => {
        this.balloonMessage.show(resp.message, resp.status === 'ok' ? 'success' : 'error');
        if (resp.status === 'ok') {
          // @ts-ignore
          // noinspection JSIgnoredPromiseFromCall
          this.router.navigate([`/control/${resp.id}`]);
          this.selectedDevice = {id: resp.id, name: deviceName, status: 'unknown'};
          this.deviceGetter.getDevices();
        }
      });
    });
  }

}
