import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {

  private _url: string;

  constructor(private http: HttpClient) {
    this._url = `http://localhost:4000/api/clases`;
   }

   getAllClases(): Observable<IAPIResponse<IClase[]>> {
    return this.http.get<IAPIResponse<IClase[]>>(this._url);
   }

   getAllClasesByDepartamento(departamentoNumber: number): Observable<IAPIResponse<IClase[]>> {
    return this.http.get<IAPIResponse<IClase[]>>(`${this._url}/departamento/${departamentoNumber}`);
   }
}
