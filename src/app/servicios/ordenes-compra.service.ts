import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdenesCompraService {
  private apiUrl = 'http://localhost/iventorypro/src/app/PHP/ordenes_compras/';

  constructor(private http: HttpClient) { }

  crearOrdenCompra(orden: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}crear_orden_compra.php`, JSON.stringify(orden));
  }

  consultarOrdenesCompra(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}consultar_ordenes_compra.php`);
  }

  editarOrdenCompra(orden: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}editar_orden_compra.php`, JSON.stringify(orden));
  }

  eliminarOrdenCompra(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}eliminar_orden_compra.php`, { id });
  }
}

