import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  url = 'http://localhost/IventoryPro/src/app/PHP/proveedores/';

  constructor(private http: HttpClient) { }

  consultarProveedores() {
    return this.http.get(`${this.url}consulta_proveedores.php`);
  }

  insertarProveedor(proveedor: any) {
    return this.http.post(`${this.url}crear_proveedores.php`, JSON.stringify(proveedor));
  }

  editarProveedor(proveedor: any) {
    return this.http.post(`${this.url}editar_proveedores.php`, JSON.stringify(proveedor));
  }

  eliminarProveedor(id: number) {
    return this.http.get(`${this.url}eliminar_proveedores.php?id=${id}`);
  }
}
