import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
 private apiUrl = 'https://steelblue-gorilla-216445.hostingersite.com/PHP/mercancia/';
  
  constructor(private http: HttpClient) { }

  consultarProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}consulta_mercancia.php`);
  }

  insertarProducto(producto: any) {
    return this.http.post(`${this.apiUrl}insertar_mercancia.php`, JSON.stringify(producto));
  }

  editarProducto(producto: any) {
    return this.http.post(`${this.apiUrl}editar_mercancia.php`, JSON.stringify(producto));
  }

  eliminarProducto(id: number) {
    return this.http.get(`${this.apiUrl}eliminar_mercancia.php?id=${id}`);
  }
}

