import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdministracionService {
  url = 'http://localhost/iventorypro/src/app/PHP/roles/'; // Ajusta esta URL
  apiUrl = 'http://localhost/IventoryPro/src/app/PHP/administracion/';

  constructor(private http: HttpClient) { }

  // Consultar todos los roles
  consultarRoles(): Observable<any> {
    return this.http.get(`${this.url}consultar_roles.php`);
  }

  // Insertar un nuevo rol
  insertarRol(rol: any): Observable<any> {
    return this.http.post(`${this.url}crear_rol.php`, rol);
  }

  // Editar un rol
  editarRol(rol: any): Observable<any> {
    return this.http.post(`${this.url}editar_rol.php`, rol);
  }

  // Eliminar un rol
  eliminarRol(id: number): Observable<any> {
    return this.http.get(`${this.url}eliminar_rol.php?id=${id}`);
  }

  // Método para consultar todas las solicitudes
  consultar(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/consultar_solicitudes.php');
  }

  // Método para editar el estado de una solicitud
  editar(solicitud: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/editar_solicitud.php', {
      id: solicitud.id,
      estado: solicitud.estado
    });
  }

}
