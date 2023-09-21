import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  private _url: string;

  constructor(private http: HttpClient) {
    this._url = `http://localhost:4000/api/departamentos`;
   }

   getAllDepartamentos(): Observable<IAPIResponse<IDepartamento[]>> {
    return this.http.get<IAPIResponse<IDepartamento[]>>(this._url);
   }
}
