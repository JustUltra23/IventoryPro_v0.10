import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SolicitudesSuministrosService {

  private apiUrl = 'https://steelblue-gorilla-216445.hostingersite.com/PHP/solicitudes_suministros/';

  constructor(private http: HttpClient) { }

  crearSolicitud(solicitud: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}crear_solicitud.php`, JSON.stringify(solicitud));
  }

  aprobarSolicitud(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}aprobar_solicitud.php`, { id });
  }

  cancelarSolicitud(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}cancelar_solicitud.php`, { id });
  }

  consultarSolicitudes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}consultar_solicitudes.php`);
  }
}
