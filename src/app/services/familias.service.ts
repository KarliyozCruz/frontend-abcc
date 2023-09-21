import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FamiliasService {

  private _url: string;

  constructor(private http: HttpClient) {
    this._url = `http://localhost:4000/api/familias`;
   }

   getAllFamilias(): Observable<IAPIResponse<IFamilia[]>> {
    return this.http.get<IAPIResponse<IFamilia[]>>(this._url);
   }

   getAllFamiliasByClase(claseNumber: number): Observable<IAPIResponse<IFamilia[]>> {
    return this.http.get<IAPIResponse<IFamilia[]>>(`${this._url}/clase/${claseNumber}`);
   }
}
