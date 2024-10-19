import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {
  private tiendasUrl = 'https://steelblue-gorilla-216445.hostingersite.com/PHP/recepcion_mercancia/';
  private apiUrl = 'https://steelblue-gorilla-216445.hostingersite.com/PHP/mantenimiento/';
  constructor(private http: HttpClient) {}

  obtenerTiendas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.tiendasUrl}consultar_tiendas.php`);
  }
  // Agregamos las funciones para insumos
agregarInsumo(insumo: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}insertar_insumo.php`, insumo);
}

actualizarInsumo(insumo: any): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}actualizar_insumo.php`, insumo);
}

eliminarInsumo(id: number): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}eliminar_insumo.php?id=${id}`);
}

consultarInsumos(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}consultar_insumos.php`);
}
crearSolicitud(solicitud: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}crear_solicitud.php`, solicitud);
}

obtenerSolicitudes(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}consultar_solicitudes.php`);
}

eliminarSolicitud(id: number): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}eliminar_solicitud.php?id=${id}`);
}

}
