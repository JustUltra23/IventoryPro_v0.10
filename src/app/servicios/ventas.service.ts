import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private apiUrl = 'https://steelblue-gorilla-216445.hostingersite.com/PHP/ventas/';
  private tiendasUrl = 'https://steelblue-gorilla-216445.hostingersite.com/PHP/recepcion_mercancia/';

  constructor(private http: HttpClient) {}

  // Método para buscar un producto por código
  buscarProducto(codigo: string): Observable<any> {
    const body = { ean: codigo };
    return this.http.post<any>(`${this.apiUrl}buscar_producto.php`, body);
  }
  // Método para registrar una venta
  registrarVenta(venta: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}registrar_venta.php`, venta);
  }
  obtenerTiendas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.tiendasUrl}consultar_tiendas.php`);
  }
  // Método para buscar un vendedor por identificación
  buscarVendedor(identificacion: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}buscar_vendedor.php?identificacion=${identificacion}`);
  }

  buscarCliente(identificacion: string) {
    return this.http.post<any>(`${this.apiUrl}verificar_identificacion.php`, { identificacion });
  }

  crearCliente(cliente: any) {
    return this.http.post<any>(`${this.apiUrl}crear_cliente.php`, cliente);
  }
 
  consultarVentas(filtros: any): Observable<any> {
    return this.http.post(`${this.apiUrl}consultar_ventas.php`, filtros);
  }

  obtenerVendedorPorIdentificacion(identificacion: string): Observable<any> {
    return this.http.post(`${this.apiUrl}obtener_vendedor_por_identificacion.php`, { identificacion });
  }

  obtenerDetallesVenta(ventaId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}consultar_detalles_ventas.php?venta_id=${ventaId}`);
  }

  //SERVICIOS PARA MODIFICAR Y ELIMINAR VENTAS//

  // Modificar la venta
  modificarVenta(ventaId: number, detalles: any[], total: number): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}modificar_venta.php`, { venta_id: ventaId, detalles, total });
  }

  // Consultar detalles de la venta
  consultarDetallesVenta(ventaId: number): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}consultar_detalles_venta_mod.php`, { venta_id: ventaId });
  }

  // Buscar venta por ID
  buscarVenta(ventaId: number): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}buscar_venta_mod.php`, { venta_id: ventaId });
  }

  // Método para eliminar una venta completa
  eliminarVenta(ventaId: number): Observable<any> {
  const url = `${this.apiUrl}eliminar_venta.php`;
  return this.http.post(url, { venta_id: ventaId });
  }
  
  eliminarDetalleVenta(detalle: { detalle_id: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}eliminar_detalle_venta.php`, detalle);
}



  // Método para cambiar el EAN de un producto en el detalle de la venta
  cambiarProductoVenta(detalleId: number, nuevoEan: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}cambiar_producto_venta.php`, { detalle_id: detalleId, nuevo_codigo_ean: nuevoEan });
  }
}
