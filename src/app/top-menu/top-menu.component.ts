import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {HttpService} from '../services/http.service';
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        right: '0',
        opacity: 1,
      })),
      state('closed', style({
        right: '-320px',
        opacity: 0,
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
export class TopMenuComponent implements OnInit {
  modeMobile = false;
  isOpen = false;

  constructor(public http: HttpService, public router: Router, private elRef: ElementRef) {
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkMobileMode();
  }

  ngOnInit() {
    if (this.http.userID === 0) {
      this.http.getUsername().subscribe();
    }
    this.checkMobileMode();
    if (!this.modeMobile) {
      this.isOpen = true;
    }
  }

  private checkMobileMode() {
    const el: HTMLElement = this.elRef.nativeElement;
    const previousMode = this.modeMobile;
    this.modeMobile = el.getBoundingClientRect().width < 1100;
    if (previousMode === this.modeMobile) {
      return;
    }
    this.isOpen = !this.modeMobile;
  }

  closeMenu() {
    this.isOpen = false;
  }

  openMenu() {
    this.isOpen = true;
  }
}
