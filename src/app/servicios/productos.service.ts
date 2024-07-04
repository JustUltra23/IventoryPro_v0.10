import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  url = 'http://localhost/iventorypro/src/app/PHP/mercancia/';
  
  constructor(private http: HttpClient) { }

  consultarProductos() {
    return this.http.get(`${this.url}consulta_mercancia.php`);
  }

  insertarProducto(producto: any) {
    return this.http.post(`${this.url}insertar_mercancia.php`, JSON.stringify(producto));
  }

  editarProducto(producto: any) {
    return this.http.post(`${this.url}editar_mercancia.php`, JSON.stringify(producto));
  }

  eliminarProducto(id: number) {
    return this.http.get(`${this.url}eliminar_mercancia.php?id=${id}`);
  }
}

