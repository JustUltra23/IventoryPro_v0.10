import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecepcionMercanciaService {

  private apiUrl = 'http://localhost/iventorypro/src/app/PHP/recepcion_mercancia/';

  constructor(private http: HttpClient) { }

  registrarRecepcion(recepcion: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}registro_mercancia.php`, recepcion);
  }

  obtenerRecepciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}consultar_recepciones.php`);
  }

  editarRecepcion(recepcion: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}editar_recepcion.php`, recepcion);
  }

  eliminarRecepcion(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}eliminar_recepcion.php`, { id });
  }

  obtenerTiendas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}consultar_tiendas.php`);
  }
  
  verificarEAN(ean: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}verificar_ean.php`, { ean });
  }

  obtenerProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}obtener_productos.php`);
  }

  obtenerInventario(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}obtener_inventario.php`);
  }
}
