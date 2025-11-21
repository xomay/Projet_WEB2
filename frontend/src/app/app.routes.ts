import { Routes } from '@angular/router';
import { Map } from './components/map/map';
import { Menu } from './components/menu/menu';

export const routes: Routes = [
  { path: '',
    redirectTo: '/menu',
    pathMatch: 'full'
  },
  {
    path: 'map',
    component: Map
  },
  {
    path: 'menu',
    component: Menu
  }
];
