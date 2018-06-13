import { Routes, RouterModule } from '@angular/router';
import { ConfigureComponent } from './components/configure/configure.component';
import { TransmutatorComponent } from './components/transmutator/transmutator.component';

// Declare App Routes
const routes: Routes = [
    {
        path: '',           // route: /
        component: TransmutatorComponent
    },
    {
        path: 'configure',  // route: /configure
        component: ConfigureComponent
    }
];

export const AppRoutes = RouterModule.forRoot(routes);
