import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Student } from './student/student';    
import { Shape  } from './shape/shape';
import { FormTemplateComponent } from './form-template/form-template';
import { FormReactiveComponent } from './form-reactive/form-reactive';
import {ApiGetComponent} from './api-get/api-get';
import { ProductService } from './services/product';
import { ApiPostComponent } from './api-post/api-post';

export const routes: Routes = [
{ path: 'home', component: Home },
{ path: 'about', component: About },
{ path: 'student', component: Student },
{ path: 'shape', component: Shape},
{ path: 'form-template', component: FormTemplateComponent},
{ path: 'form-reactive', component: FormReactiveComponent},
{ path: 'api-get', component: ApiGetComponent},
{ path: 'api-post', component: ApiPostComponent},
{ path: '**', redirectTo: '/home' }
];

