import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesEmpleadosService {
  private apiUrl = 'http://localhost/IventoryPro/src/app/PHP/rh/'; 

  constructor(private http: HttpClient) { }

  // Obtener PQRS del usuario
  obtenerPQRS(usuario_id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/consultar_pqrs.php`, {
      params: { usuario_id } // Directamente pasamos el número como parámetro
    });
  }
  // Crear nueva PQRS
  crearPQR(pqrData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/insertar_pqr.php`, pqrData, { headers });
  }

  // Editar PQRS existente
  editarPQR(pqrId: number, pqrData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}/editar_pqr.php?id=${pqrId}`, pqrData, { headers });
  }

  // Eliminar PQRS
  eliminarPQR(pqrId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar_pqr.php?id=${pqrId}`);
  }

  // Obtener lista de tiendas
  obtenerTiendas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/obtener_tiendas.php`);
  }

  // Obtener información de usuarios
  obtenerUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/obtener_usuarios.php`);
  }

}
