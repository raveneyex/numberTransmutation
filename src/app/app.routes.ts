import { Routes, RouterModule } from '@angular/router';
import { ConfigureComponent } from './components/configure/configure.component';
import { TransmutatorComponent } from './components/transmutator/transmutator.component';

const routes: Routes = [
    {
        path: '',
        component: TransmutatorComponent
    },
    {
        path: 'configure',
        component: ConfigureComponent
    }
];

export const AppRoutes = RouterModule.forRoot(routes);