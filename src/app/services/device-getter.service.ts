import {EventEmitter, Injectable, Output} from '@angular/core';
import {interval, Observable, of} from 'rxjs';
import {HttpService} from './http.service';
import {BalloonMessageFactoryService} from '../balloon-message/balloon-message-factory.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DeviceGetterService {

  private DEVICE_INFO = {
    id: '1', name: 'testY', status: '??',
    attacks: [{ip: '127.0.0.1', service: 'SSH', time: 0, user: 'user'}]
  };

  private autoresfreshTimer = null;

  @Output()
  devicesListUpdate: EventEmitter<DeviceBasic[]> = new EventEmitter();

  set autorefresh(status: boolean) {
    if (status && this.autoresfreshTimer !== null) {
      return;
    }
    if (!status && this.autoresfreshTimer === null) {
      return;
    }
    if (status) {
      interval(30 * 1000).subscribe(() => this.getDevices());
    } else {
      clearInterval(this.autoresfreshTimer);
      this.autoresfreshTimer = null;
    }
  }

  constructor(private httpService: HttpService, private balloon: BalloonMessageFactoryService, private router: Router) {
  }

  getDevices(): Observable<DeviceBasic[]> {
    const r = this.httpService.get('/api/device/list');
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

  deviceDelete(device): Observable<{ success: boolean, message: string }> {
    const r = this.httpService.post('/api/device/delete', {id: device.id});
    r.subscribe(rr => {
      this.balloon.show(rr.message, rr.success ? 'success' : 'error');
      this.getDevices();
      this.router.navigate(['/control']);
    });
    return r;
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
