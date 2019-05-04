import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {ControlPanelComponent} from './control-panel/control-panel.component';
import {DeviceListComponent} from './control-panel/device-list/device-list.component';
import {DeviceInfoComponent} from './control-panel/device-info/device-info.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {InstallationModeSelectComponent} from './control-panel/device-info/instalation-mode-select/installation-mode-select.component';
import {WarningDivComponent} from './warning-div/warning-div.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BalloonMessageComponent} from './balloon-message/balloon-message.component';
import {DialogComponent} from './dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ControlPanelComponent,
    DeviceListComponent,
    DeviceInfoComponent,
    InstallationModeSelectComponent,
    WarningDivComponent,
    LoginComponent,
    BalloonMessageComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  entryComponents: [
    BalloonMessageComponent,
    DialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
