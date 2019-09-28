import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpService} from '../services/http.service';
import {Profile} from './profile.model';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {DialogService} from '../dialog/dialog.service';
import {BalloonMessageFactoryService} from '../balloon-message/balloon-message-factory.service';
import {Router} from '@angular/router';
import {DeviceBasic} from '../services/device-getter.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input()
  expandable = true;

  @Input()
  allowSend = true;

  @Input()
  disabled: boolean = null;

  @Input()
  device: DeviceBasic = null;

  @Output()
  profileRemove = new EventEmitter<DeviceBasic>();

  exists: boolean = null;

  expanded = false;
  profile: Profile = null;
  newRule = new FormControl();

  constructor(protected http: HttpService,
              private dialog: DialogService,
              private balloon: BalloonMessageFactoryService,
              private router: Router) {
  }

  // tslint:disable-next-line:variable-name
  private _id: number = null;

  @Input()
  set id(val: number) {
    this._id = val;
    this.exists = val !== -1;
    this.loadProfileData();
  }

  ngOnInit() {
    if (!this.expandable) {
      this.expanded = true;
    }

    this.newRule.valueChanges.pipe(debounceTime(500)).subscribe(
      () => {
        if (this.newRule.value && this.newRule.value.length) {
          this.profile.config.filters.push(this.newRule.value);
          this.newRule.setValue('');
        }
      }
    );

    this.loadProfileData();
  }

  loadProfileData() {
    if (this._id === -1) {
      // create new profile
      this.profile = {
        id: -1,
        author: 0,
        name: 'New profile',
        description: '',
        config: {
          logFile: '',
          filters: ['%USER% just created a new profile from %IP%']
        }
      };
    } else {
      this.http.get(`/api/hub/profile/${this._id}`).subscribe(r => {
        this.profile = r;
        if (this.disabled === null) {
          this.disabled = this.profile.author !== this.http.userID;
        }
      });
    }
  }

  deleteProfile() {
    this.http.post(`/api/hub/profile/delete`, {id: this.profile.id}).subscribe(r => {
      if (!r) {
        return;
      }
      this.balloon.show(r, 'success');
      // noinspection JSIgnoredPromiseFromCall
      this.router.navigate(['/hub']);
    });
  }

  saveProfile() {
    this.http.post(`/api/hub/profile/${this._id}`, {data: this.profile}).subscribe(r => {
      if (!r) {
        return;
      }
      this.balloon.show(r.message, 'success');
      this.id = r.id;
      // noinspection JSIgnoredPromiseFromCall
      this.router.navigate([`/hub/profile/${r.id}`]);
    });
  }

  removeEmptyLines() {
    this.profile.config.filters = this.profile.config.filters.filter(f => f.trim().length > 0);
  }

  trackByIndex(index: number) {
    return index;
  }

  testLineAgainstProfile(title = 'Enter your log line to test', line = null) {
    this.dialog.show(title, line).subscribe(attackLine => {
      if (!attackLine) {
        return;
      }

      class Filter {
        raw: string;
        regex: RegExp;
        variables: string[];
      }

      const filters = this.profile.config.filters.map(filterLine => {
        filterLine = filterLine.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');

        const filter = new Filter();
        filter.raw = filterLine;
        filter.variables = [];

        while (true) {
          const match = /%.*?%/.exec(filterLine);
          if (!match) {
            break;
          }
          filter.variables.push(match[0].substring(1, match[0].length - 1));
          filterLine = filterLine.replace(match[0], '(.+?)');
        }

        if (filterLine.endsWith('?)')) {
          filterLine = `${filterLine.substring(0, filterLine.length - 2)})`;
        }

        filter.regex = new RegExp(filterLine);

        return filter;
      });

      for (const filter of filters) {
        const match = filter.regex.exec(attackLine);
        if (!match) {
          continue;
        }
        this.testLineAgainstProfile(filter.raw, attackLine);

        const variablesValues = {};
        filter.variables.forEach((v, i) => variablesValues[v] = match[i + 1]);

        console.log('Match result');
        console.log(attackLine);
        console.log(filter.raw);
        console.log(variablesValues);

        return;
      }

      this.testLineAgainstProfile('No match found', attackLine);
    });
  }

  sendProfile() {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate([`/hub/profile/${this._id}/send`]);
  }

  removeFromDevice() {
    this.http.post(`/api/hub/profile/remove`, {id: this.profile.id, device: this.device.id}).subscribe(r => {
      if (!r) {
        return;
      }
      this.balloon.show(r, 'success');
      this.profile = null;
      this.profileRemove.emit(this.device);
    });
  }
}
