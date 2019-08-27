import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {DeviceBasic, DeviceGetterService} from '../../services/device-getter.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../dialog/dialog.service';
import {BalloonMessageFactoryService} from '../../balloon-message/balloon-message-factory.service';
import {HttpService} from '../../services/http.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        left: '0',
      })),
      state('closed', style({
        left: '-290px',
      })),
      transition('open => closed', [
        animate('0.3s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
    trigger('openCloseArrow', [
      state('open', style({
        left: '280px',
      })),
      state('closed', style({
        left: '-20px',
      })),
      transition('open => closed', [
        animate('0.3s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ]
})
export class DeviceListComponent implements OnInit {
  devicesOnline: DeviceBasic[];
  devicesOffline: DeviceBasic[];
  devicesNotLinked: DeviceBasic[];
  selectedDeviceVar: DeviceBasic;

  modeMobile = false;
  isOpen = true;

  set selectedDevice(device: DeviceBasic) {
    this.selectedDeviceVar = device;
    this.deviceSelected.emit(device);
  }

  @Output()
  deviceSelected: EventEmitter<DeviceBasic> = new EventEmitter();

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkMobileMode();
  }

  constructor(public deviceGetter: DeviceGetterService, public route: ActivatedRoute, public dialogCreator: DialogService,
              public balloonMessage: BalloonMessageFactoryService, public http: HttpService, public router: Router) {
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
    this.deviceGetter.autorefresh = true;
    this.checkMobileMode();
  }

  private checkMobileMode() {
    const previousMode = this.modeMobile;
    this.modeMobile = window.document.body.getBoundingClientRect().width < 1100;
    if (previousMode === this.modeMobile) {
      return;
    }
    this.isOpen = !this.modeMobile;
  }

  addNewDevice() {
    this.dialogCreator.show('Enter the name of your new device:').subscribe(deviceName => {
      if (!deviceName) {
        return;
      }
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
