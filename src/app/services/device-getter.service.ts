import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceGetterService {
  private DEVICES = [
    {id: '1', name: 'testY', status: 'online'},
    {id: '2', name: 'testN', status: 'offline'},
    {id: '3', name: 'testI', status: 'not-linked'},
    {id: '4', name: 'testY', status: 'online'},
  ];

  private DEVICE_INFO = {
    id: '1', name: 'testY', status: 'online',
    attacks: [{ip: '127.0.0.1', service: 'SSH', time: 0, user: 'user'}]
  };

  constructor() { }

  getDevices(): Observable<DeviceBasic[]> {
    return of<DeviceBasic[]>(this.DEVICES);
  }

  getDeviceInfo(device: DeviceBasic): Observable<Device> {
    const mockDevice = this.DEVICE_INFO;
    mockDevice.id = device.id;
    mockDevice.name = device.name;

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
