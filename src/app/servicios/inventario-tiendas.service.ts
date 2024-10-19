import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventarioTiendasService {
  private apiUrlInventario = 'https://steelblue-gorilla-216445.hostingersite.com/PHP/consulta_inventario/consulta_inventario.php';
  private apiUrlTiendas = 'https://steelblue-gorilla-216445.hostingersite.com/PHP/consulta_inventario/consulta_tiendas.php';

  constructor(private http: HttpClient) { }

  getInventario(filters: any): Observable<any> {
    let params = new HttpParams();
    if (filters.tienda_id) {
      params = params.set('tienda_id', filters.tienda_id);
    }
    if (filters.codigo_ean) {
      params = params.set('codigo_ean', filters.codigo_ean);
    }
    return this.http.get<any>(this.apiUrlInventario, { params });
  }

  getTiendas(): Observable<any> {
    return this.http.get<any>(this.apiUrlTiendas);
  }
}

