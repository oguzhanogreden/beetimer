import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';
import { AlertDrawerComponent } from './alert-drawer/alert-drawer.component';
import { ReminderComponent } from './components/reminder/reminder.component';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    AlertDrawerComponent,
    ReminderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
