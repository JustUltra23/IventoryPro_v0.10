import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url='http://localhost/iventorypro/src/app/PHP/usuario/';

  constructor(private http: HttpClient) { }

  consultar() {
    return this.http.get(`${this.url}consulta_usuarios.php`);
  }

  insertar(usuario: any) { // Cambiado de articulo a usuario
    return this.http.post(`${this.url}insertar_usuarios.php`, usuario); // Enviar el objeto usuario directamente
  }

  eliminar(id: number) {
    return this.http.get(`${this.url}eliminar_usuarios.php?id=${id}`);
  }

  edit(datos: any) {
    return this.http.post(`${this.url}editar_usuarios.php`, datos);
  }

  validarDatos(user: any): Observable<any> {
    return this.http.post<any>(`${this.url}/validar_usuario.php`, user);
  }
  
}

