import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  private _url: string;

  constructor(private http: HttpClient) {
    this._url = `http://localhost:4000/api/articulos`;
   }

   getArticulosBySku(sku: number): Observable<IAPIResponse<IArticulo>> {
    return this.http.get<IAPIResponse<IArticulo>>(`${this._url}/${sku}`);
   }

   createArticulo(articulo: IArticulo): Observable<IAPIResponse<any>> {
    return this.http.post<IAPIResponse<any>>(`${this._url}`, articulo);
   }

   updateArticulo(articulo: IArticulo, articuloId: number): Observable<IAPIResponse<any>> {
    return this.http.put<IAPIResponse<any>>(`${this._url}/${articuloId}`, articulo);
   }

   deleteArticulo(articuloId: number): Observable<IAPIResponse<any>> {
    return this.http.delete<IAPIResponse<any>>(`${this._url}/${articuloId}`);
   }
}
