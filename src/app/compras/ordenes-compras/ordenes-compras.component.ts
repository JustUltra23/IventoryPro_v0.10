import { Component, OnInit } from '@angular/core';
import { OrdenesCompraService } from '../../servicios/ordenes-compra.service';
import { ComprasService } from '../../servicios/compras.service';
import { ProductosService } from '../../servicios/productos.service';

@Component({
  selector: 'app-ordenes-compras',
  templateUrl: './ordenes-compras.component.html',
  styleUrl: './ordenes-compras.component.scss'
})
export class OrdenesComprasComponent implements OnInit {
  
  ordenesCompras: any[] = [];
  proveedores: any[] = [];
  productos: any[] = [];
  nuevaOrden: any = { fecha: '', cantidad: 0, articulo: null };
  ordenParaEditar: any = null;

  constructor(
    private ordenesCompraService: OrdenesCompraService,
    private comprasService: ComprasService,
    private productosService: ProductosService
  ) {}

  ngOnInit(): void {
    this.consultarOrdenesCompras();
    this.consultarProveedores();
    this.consultarProductos();
  }

  consultarOrdenesCompras(): void {
    this.ordenesCompraService.consultarOrdenesCompra().subscribe(data => {
      this.ordenesCompras = data;
    });
  }

  consultarProveedores(): void {
    this.comprasService.consultarProveedores().subscribe(data => {
      this.proveedores = data;
    });
  }

  consultarProductos(): void {
    this.productosService.consultarProductos().subscribe(data => {
      this.productos = data;
    });
  }

  crearOrdenCompra(): void {
    // Verifica que el articulo seleccionado es el código EAN del producto
    const articuloSeleccionado = this.productos.find(p => p.id === this.nuevaOrden.articulo).codigo_ean;
    const ordenParaCrear = {
      ...this.nuevaOrden,
      articulo: articuloSeleccionado
    };
  
    this.ordenesCompraService.crearOrdenCompra(ordenParaCrear).subscribe(response => {
      if (response.success) {
        this.consultarOrdenesCompras();
        this.nuevaOrden = { fecha: '', cantidad: 0, articulo: null };
      } else {
        console.error(response.error);
      }
    });
  }
  iniciarEdicion(orden: any): void {
    this.ordenParaEditar = { ...orden, articulo: orden.articulo };
  }

  actualizarOrdenCompra(): void {
    if (!this.ordenParaEditar) return;

    const articuloSeleccionado = this.productos.find(p => p.id === this.ordenParaEditar.articulo).codigo_ean;
    const ordenParaActualizar = {
      ...this.ordenParaEditar,
      articulo: articuloSeleccionado
    };

    this.ordenesCompraService.editarOrdenCompra(ordenParaActualizar).subscribe(response => {
      if (response.success) {
        this.consultarOrdenesCompras();
        this.ordenParaEditar = null;
      } else {
        console.error(response.error);
      }
    });
  }

  cancelarEdicion(): void {
    this.ordenParaEditar = null;
  }

  eliminarOrdenCompra(id: number): void {
    this.ordenesCompraService.eliminarOrdenCompra(id).subscribe(response => {
      if (response.success) {
        this.consultarOrdenesCompras();
      }
    });
  }
}