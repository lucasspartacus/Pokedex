import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
  { path: 'details/:name', loadChildren: () => import('./pages/details/details.module').then(m => m.DetailsPageModule) },
  { path: 'favorites', loadChildren: () => import('./pages/favorites/favorites.module').then( m => m.FavoritesPageModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
