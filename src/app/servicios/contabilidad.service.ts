import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContabilidadService {

  private baseUrl = 'https://steelblue-gorilla-216445.hostingersite.com/PHP/contabilidad/'; 

  constructor(private http: HttpClient) { }

  // Obtener todas las conciliaciones
  obtenerConciliaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}obtener_conciliaciones.php`);
  }

  // Crear una nueva conciliación
  crearConciliacion(conciliacion: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}crear_conciliacion.php`, conciliacion);
  }

  // Editar una conciliación existente
  editarConciliacion(conciliacion: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}editar_conciliacion.php`, conciliacion);
  }

  // Eliminar una conciliación
  eliminarConciliacion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}eliminar_conciliacion.php?id=${id}`);
  }


  //SERVICIOS MODULOS ESTADOS FINANCIEROS

  obtenerEstadosFinancieros(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}estados_financieros.php`);
  }

  crearEstadoFinanciero(estado: any): Observable<any> {
    return this.http.post(`${this.baseUrl}crear_estado_financiero.php`, estado);
  }

  editarEstadoFinanciero(estado: any): Observable<any> {
    return this.http.put(`${this.baseUrl}editar_estado_financiero.php?id=${estado.id}`, estado);
  }

  eliminarEstadoFinanciero(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}eliminar_estado_financiero.php?id=${id}`);
  }
  obtenerTiendas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}consultar_tiendas.php`);
  }


  //SERVICIOS MODULO IMPUESTOS


  // Crear impuesto
  crearImpuesto(impuesto: any): Observable<any> {
    return this.http.post(`${this.baseUrl}crear_impuesto.php`, impuesto);
  }

  // Obtener impuestos
  obtenerImpuestos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}obtener_impuestos.php`);
  }

  // Editar impuesto
  editarImpuesto(impuesto: any): Observable<any> {
    return this.http.put(`${this.baseUrl}editar_impuesto.php?id=${impuesto.id}`, impuesto);
  }

  // Eliminar impuesto
  eliminarImpuesto(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}eliminar_impuesto.php?id=${id}`);
  }

}
