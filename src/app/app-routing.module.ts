import { NgModule, } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


const routes: Routes = [
    {path: '', loadChildren: () => import('./components/articulos/articulos.module').then((m) => m.ArticulosModule), pathMatch: 'full'},
    {path: '**', redirectTo:''}
]

@NgModule({
    imports:[
        RouterModule.forRoot(routes),
    ],
    exports:[
        RouterModule
    ]
})

export class AppRoutingModule {}