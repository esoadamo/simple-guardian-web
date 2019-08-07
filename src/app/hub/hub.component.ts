/* tslint:disable:variable-name */
import {Component, OnInit} from '@angular/core';
import {HttpService} from '../services/http.service';
import {Profile} from './hub.model';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.scss']
})
export class HubComponent implements OnInit {
  profiles: Profile[] = null;
  searchFilter = new FormControl();

  private _profiles: Profile[] = null;

  constructor(public http: HttpService, private router: Router) {
  }

  ngOnInit() {
    this.loadProfiles();

    this.searchFilter.valueChanges.subscribe(() => this.updateProfiles());
  }

  loadProfiles() {
    this.http.get('/api/hub/list').subscribe(p => {
      this._profiles = p;
      this.updateProfiles();
    });
  }

  updateProfiles() {
    this.profiles = this._profiles.filter(p => {
      if (!this.searchFilter.value || this.searchFilter.value.length === 0) {
        return true;
      }

      const regex = new RegExp(this.searchFilter.value, 'ig');
      return regex.exec(p.name) !== null;
    });
  }

  showProfile(id: number) {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate([`/hub/profile/${id}`]);
  }

  newProfile() {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate([`/hub/profile/-1`]);
  }
}
