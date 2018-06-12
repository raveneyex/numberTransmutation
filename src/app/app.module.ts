import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TransmutatorComponent } from './components/transmutator/transmutator.component';
import { ConfigureComponent } from './components/configure/configure.component';
import { AppRoutes } from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
    TransmutatorComponent,
    ConfigureComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
