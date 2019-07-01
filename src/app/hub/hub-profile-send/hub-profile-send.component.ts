import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DeviceBasic, DeviceGetterService} from '../../services/device-getter.service';
import {Observable} from 'rxjs';
import {HttpService} from '../../services/http.service';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {BalloonMessageFactoryService} from '../../balloon-message/balloon-message-factory.service';

@Component({
  selector: 'app-hub-profile-send',
  templateUrl: './hub-profile-send.component.html',
  styleUrls: ['./hub-profile-send.component.scss']
})
export class HubProfileSendComponent implements OnInit {
  devices$: Observable<DeviceBasic[]>;
  profileName$: Observable<string>;
  profileID: number;

  @ViewChild('form')
  private form: ElementRef;

  constructor(private deviceGetter: DeviceGetterService,
              private http: HttpService,
              private route: ActivatedRoute,
              private balloon: BalloonMessageFactoryService) {
  }

  ngOnInit() {
    this.profileID = Number(this.route.snapshot.paramMap.get('id'));
    this.devices$ = this.deviceGetter.getDevices();
    this.profileName$ = this.http.get(`/api/hub/profile/${this.profileID}`).pipe(map(
      r => r.name
    ));
  }

  selectAll() {
    this.form.nativeElement.querySelectorAll('.value').forEach(el => el.checked = true);
  }

  selectNone() {
    this.form.nativeElement.querySelectorAll('.value').forEach(el => el.checked = false);
  }

  cancel() {
    history.back();
  }

  send() {
    const selectedDevices = [];
    this.form.nativeElement.querySelectorAll('.value').forEach(el => {
      if (el.checked) {
        selectedDevices.push(el.value);
      }
    });

    if (!selectedDevices.length) {
      this.balloon.show('No device selected', 'error');
    }

    this.http.post(`/api/hub/profile/${this.profileID}/send`, {devices: selectedDevices}).subscribe(r => {
      if (!r) {
        return;
      }
      this.balloon.show('Profile sent', 'success');
      history.back();
    });
  }
}
