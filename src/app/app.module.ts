import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TransmutatorComponent } from './components/transmutator/transmutator.component';
import { ConfigureComponent } from './components/configure/configure.component';
import { AppRoutes } from './app.routes';


@NgModule({
    declarations: [              // Components to use.
        AppComponent,
        TransmutatorComponent,
        ConfigureComponent
    ],
    imports: [                  // Modules for the App
        BrowserModule,
        FormsModule,
        AppRoutes
    ],
    providers: [],              // No app-wide Services
    bootstrap: [AppComponent]   // App entry component
})
// No Logic Needed.
export class AppModule { }
