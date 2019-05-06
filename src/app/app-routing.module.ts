import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ControlPanelComponent} from './control-panel/control-panel.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomePageComponent} from './home-page/home-page.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'control', component: ControlPanelComponent},
  {path: 'control/:id', component: ControlPanelComponent},
  {path: 'control/:id/config', component: ControlPanelComponent},
  {path: 'control/:id/attacks', component: ControlPanelComponent},
  {path: 'control/:id/bans', component: ControlPanelComponent},
  {path: 'control/:id/profiles', component: ControlPanelComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {
}
