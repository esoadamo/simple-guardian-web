import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ControlPanelComponent} from './control-panel/control-panel.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomePageComponent} from './home-page/home-page.component';
import {UserConfigComponent} from './user-config/user-config.component';
import {HubComponent} from './hub/hub.component';
import {HubProfileComponent} from './hub/hub-profile/hub-profile.component';
import {HubProfileSendComponent} from './hub/hub-profile-send/hub-profile-send.component';
import {AboutPageComponent} from './about-page/about-page.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'control', component: ControlPanelComponent},
  {path: 'control/:id', component: ControlPanelComponent},
  {path: 'config', component: UserConfigComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'about', component: AboutPageComponent},
  {path: 'hub', component: HubComponent},
  {path: 'hub/profile/:id', component: HubProfileComponent},
  {path: 'hub/profile/:id/send', component: HubProfileSendComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {
}
