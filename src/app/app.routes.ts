import { Routes } from '@angular/router';
import { featureRoutes } from './features/feature.routes';

export const routes: Routes = [
	...featureRoutes,
	{ path: '**', redirectTo: '/home' }
];

