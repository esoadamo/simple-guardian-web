import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ControlPanelComponent} from './control-panel/control-panel.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceInfoComponent } from './device-info/device-info.component';

@NgModule({
  declarations: [
    AppComponent,
    ControlPanelComponent,
    DeviceListComponent,
    DeviceInfoComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
