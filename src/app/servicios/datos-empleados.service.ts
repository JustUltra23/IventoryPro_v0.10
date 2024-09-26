import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosEmpleadosService {

  private apiUrl = 'http://localhost/IventoryPro/src/app/PHP/rh/';  // Cambia a la URL donde tienes los PHP

  constructor(private http: HttpClient) { }

  obtenerEmpleados(): Observable<any> {
    return this.http.get(`${this.apiUrl}/obtener_empleados.php`);
  }

  crearEmpleado(empleado: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear_empleado.php`, empleado);
  }

  actualizarEmpleado(empleado: any): Observable<any> {
    console.log('Empleado a actualizar:', empleado); // Para depurar en el lado del servicio
    return this.http.put(`${this.apiUrl}/actualizar_empleado.php?id=${empleado.id}`, empleado);
  }

  eliminarEmpleado(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/eliminar_empleado.php`, { id });
  }
}
