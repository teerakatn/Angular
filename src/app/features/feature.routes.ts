import { Routes } from '@angular/router';

export const featureRoutes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('../home/home').then((m) => m.Home)
  },
  {
    path: 'about',
    loadComponent: () => import('../about/about').then((m) => m.About)
  },
  {
    path: 'student',
    loadComponent: () => import('../student/student').then((m) => m.Student)
  },
  {
    path: 'shape',
    loadComponent: () => import('../shape/shape').then((m) => m.Shape)
  },
  {
    path: 'form-template',
    loadComponent: () =>
      import('../form-template/form-template').then((m) => m.FormTemplateComponent)
  },
  {
    path: 'form-reactive',
    loadComponent: () =>
      import('../form-reactive/form-reactive').then((m) => m.FormReactiveComponent)
  },
  {
    path: 'api-get',
    loadComponent: () => import('../api-get/api-get').then((m) => m.ApiGetComponent)
  },
  {
    path: 'api-post',
    loadComponent: () => import('../api-post/api-post').then((m) => m.ApiPostComponent)
  }
];
