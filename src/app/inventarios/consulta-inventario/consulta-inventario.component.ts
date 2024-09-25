import { Component, OnInit } from '@angular/core';
import { InventarioTiendasService } from '../../servicios/inventario-tiendas.service';

@Component({
  selector: 'app-consulta-inventario',
  templateUrl: './consulta-inventario.component.html',
  styleUrl: './consulta-inventario.component.scss'
})
export class ConsultaInventarioComponent  implements OnInit {

  inventario: any[] = [];
  tiendas: any[] = [];
  filters = {
    tienda_id: '',
    codigo_ean: ''
  };

  constructor(private inventarioService: InventarioTiendasService) { }

  ngOnInit(): void {
    this.getTiendas();
    this.getInventario();  // Por defecto muestra todo el inventario
  }

  getTiendas(): void {
    this.inventarioService.getTiendas().subscribe(data => {
      this.tiendas = data;
    }, error => {
      console.error('Error al obtener las tiendas', error);
    });
  }

  onFilterChange(): void {
    this.getInventario();
  }

  getInventario(): void {
    this.inventarioService.getInventario(this.filters).subscribe(data => {
      this.inventario = data;
    }, error => {
      console.error('Error al obtener el inventario', error);
    });
  }
}