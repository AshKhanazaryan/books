import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {FormsModule} from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  }
];

@NgModule({
  declarations: [
    MainComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    BrowserModule,
    CommonModule
  ],
  exports: [RouterModule, MainComponent]
})

export class MainModule {
}
