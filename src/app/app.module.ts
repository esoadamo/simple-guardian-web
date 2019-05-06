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
import {TopMenuComponent} from './top-menu/top-menu.component';
import {RegisterComponent} from './register/register.component';
import {HomePageComponent} from './home-page/home-page.component';
import {UserConfigComponent} from './user-config/user-config.component';
import {PasswordCheckComponent} from './user-config/password-check/password-check.component';

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
    TopMenuComponent,
    RegisterComponent,
    HomePageComponent,
    UserConfigComponent,
    PasswordCheckComponent,
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
    DialogComponent,
    PasswordCheckComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
