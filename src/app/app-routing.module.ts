import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ControlPanelComponent} from './control-panel/control-panel.component';

const routes: Routes = [
  {path: 'control', component: ControlPanelComponent},
  {path: 'control/:id', component: ControlPanelComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {
}
