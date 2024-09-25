import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CotizacionesService {
  private apiUrl = 'http://localhost/iventorypro/src/app/PHP/cotizaciones/';

  constructor(private http: HttpClient) { }

  crearCotizacion(cotizacion: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}crear_cotizacion.php`, cotizacion, { headers });
  }

  consultarCotizaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}consultar_cotizaciones.php`);
  }

  editarCotizacion(cotizacion: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}editar_cotizacion.php`, cotizacion, { headers });
  }

  eliminarCotizacion(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}eliminar_cotizacion.php`, { id }, { headers });
  }
}
