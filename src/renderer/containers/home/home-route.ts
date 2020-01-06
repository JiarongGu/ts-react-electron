import { Home } from './home';
import { RouteModel } from '@renderer/models';

export const homeRoute: RouteModel = {
  key: 'home',
  link: {
    name: 'home',
    icon: 'home',
    url: '/home',
  },
  config: {
    path: '/home',
    component: Home
  }
}