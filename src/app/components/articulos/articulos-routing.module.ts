import { NgModule } from '@angular/core';
import { ArticulosComponent } from './articulos.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: '', component: ArticulosComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ArticulosRoutingModule { }
