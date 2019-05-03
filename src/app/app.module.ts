import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ControlPanelComponent} from './control-panel/control-panel.component';
import {DeviceListComponent} from './device-list/device-list.component';
import {DeviceInfoComponent} from './device-info/device-info.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {InstallationModeSelectComponent} from './device-info/instalation-mode-select/installation-mode-select.component';
import {WarningDivComponent} from './warning-div/warning-div.component';

@NgModule({
  declarations: [
    AppComponent,
    ControlPanelComponent,
    DeviceListComponent,
    DeviceInfoComponent,
    InstallationModeSelectComponent,
    WarningDivComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
