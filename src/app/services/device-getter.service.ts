import {EventEmitter, Injectable, Output} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceGetterService {

  private DEVICE_INFO = {
    id: '1', name: 'testY', status: '??',
    attacks: [{ip: '127.0.0.1', service: 'SSH', time: 0, user: 'user'}]
  };

  @Output()
  devicesListUpdate: EventEmitter<DeviceBasic[]> = new EventEmitter();

  constructor(private httpService: HttpService) {
  }

  getDevices(): Observable<DeviceBasic[]> {
    const r = this.httpService.get('/api/listDevices');
    r.subscribe(rr => this.devicesListUpdate.emit(rr));
    return r;
  }

  getDeviceInfo(device: DeviceBasic): Observable<Device> {
    const mockDevice = this.DEVICE_INFO;
    mockDevice.id = device.id;
    mockDevice.name = device.name;
    mockDevice.status = device.status;

    return of<Device>(this.DEVICE_INFO);
  }
}

export interface DeviceBasic {
  id: string;
  name: string;
  status: string;
}

export interface Device extends DeviceBasic {
  attacks: Attack[];
}

export interface Attack {
  ip: string;
  service: string;
  time: number;
  user: string | null;
}
