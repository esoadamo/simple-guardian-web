import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DeviceBasic, DeviceGetterService} from '../../services/device-getter.service';
import {ActivatedRoute} from '@angular/router';
import {DialogService} from '../../dialog/dialog.service';
import {BalloonMessageFactoryService} from '../../balloon-message/balloon-message-factory.service';

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
              private ballonMessage: BalloonMessageFactoryService) {
  }

  ngOnInit() {
    const selectedID = this.route.snapshot.paramMap.get('id');
    if (selectedID) {
      console.log('getting device info');
      this.selectedDevice = {id: selectedID, name: 'unknown', status: 'unknown'};
    }
    this.deviceGetter.getDevices().subscribe(devices => {
      console.log(devices);
      // Update selected device
      if (this.selectedDeviceVar) {
        this.selectedDevice = devices.filter(d => d.id === this.selectedDeviceVar.id)[0];
      }
      this.devicesOffline = devices.filter(d => d.status === 'offline');
      this.devicesOnline = devices.filter(d => d.status === 'online');
      this.devicesNotLinked = devices.filter(d => d.status === 'not-linked');
    });
  }

  addNewDevice() {
    console.log(this.dialogCreator);
    this.dialogCreator.show('Enter the name of your new device:').subscribe(r => {
      console.log(r);
    });
  }

}
