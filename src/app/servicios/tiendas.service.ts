import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiendasService  {
  url = 'http://localhost/iventorypro/src/app/PHP/tiendas/'; // Ajusta esta URL a la ruta de tu servidor

  constructor(private http: HttpClient) { }

  // Consultar todas las tiendas
  consultar(): Observable<any> {
    return this.http.get(`${this.url}consultar_tiendas.php`);
  }

  // Insertar una nueva tienda
  insertar(tienda: any): Observable<any> {
    return this.http.post(`${this.url}crear_tiendas.php`, tienda); // Enviar el objeto tienda directamente
  }

  // Eliminar tienda
  eliminar(id: number): Observable<any> {
    return this.http.get(`${this.url}eliminar_tiendas.php?id=${id}`);
  }

  // Editar tienda
  editar(datos: any): Observable<any> {
    return this.http.post(`${this.url}editar_tiendas.php`, datos);
  }
}
