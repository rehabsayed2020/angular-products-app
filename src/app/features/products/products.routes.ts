import { Routes } from '@angular/router';
import { ProductList } from './pages/product-list/product-list';
import { ProductDetails } from './pages/product-details/product-details';

const routes: Routes = [
  // {
  //   path: '',
  //   children: [
  //     {
  //       path: ':username',
  //       component: ProfileComponent,
  //       children: [
  //         {
  //           path: '',
  //           loadComponent: () => import('./components/profile-articles.component'),
  //         },
  //         {
  //           path: 'favorites',
  //           loadComponent: () => import('./components/profile-favorites.component'),
  //         },
  //       ],
  //     },
  //   ],
  // },


      //  { path: '', component: ProductList },
      //  { path: 'products/:id', component: ProductDetails }

];

export default routes;
