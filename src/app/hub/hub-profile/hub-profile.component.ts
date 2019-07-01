import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-hub-profile',
  templateUrl: './hub-profile.component.html',
  styleUrls: ['./hub-profile.component.css']
})
export class HubProfileComponent implements OnInit {
  profileID: number = null;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.profileID = Number(this.route.snapshot.paramMap.get('id'));
  }

}
