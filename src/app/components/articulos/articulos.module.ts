import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticulosComponent } from './articulos.component';
import { ArticulosRoutingModule } from './articulos-routing.module';



@NgModule({
  declarations: [
    ArticulosComponent
  ],
  imports: [
    CommonModule,
    ArticulosRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
  ]
})
export class ArticulosModule { }
