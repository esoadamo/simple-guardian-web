import {EventEmitter, Injectable, Output} from '@angular/core';
import {interval, Observable} from 'rxjs';
import {HttpService} from './http.service';
import {BalloonMessageFactoryService} from '../balloon-message/balloon-message-factory.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DeviceGetterService {

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
    return this.httpService.get(`/api/device/${device.id}/info`);
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

  deviceUpdate(device): Observable<{ success: boolean, message: string }> {
    const r = this.httpService.post('/api/device/update', {id: device.id});
    r.subscribe(rr => {
      this.balloon.show(rr.message, rr.success ? 'success' : 'error');
    });
    return r;
  }

  deviceUnban(device: DeviceBasic, ip: string): Observable<{ success: boolean, message: string }> {
    const r = this.httpService.post('/api/device/unban', {id: device.id, ip});
    r.subscribe(rr => {
      this.balloon.show(rr.message, rr.success ? 'success' : 'error');
    });
    return r;
  }

  deviceRename(device: DeviceBasic, name: string): Observable<{ success: boolean, message: string }> {
    const r = this.httpService.post('/api/device/rename', {id: device.id, name});
    r.subscribe(rr => {
      this.balloon.show(rr.message, rr.success ? 'success' : 'error');
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
  bans: Ban[];
  version: string;
  profiles: number[];
}

export interface Attack {
  ip: string;
  profile: string;
  time: number;
  user: string | null;
}

export interface Ban {
  ip: string;
  time: number;
  attacksCount: number;
}
