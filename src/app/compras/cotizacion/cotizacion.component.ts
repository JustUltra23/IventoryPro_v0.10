import { Component, OnInit } from '@angular/core';
import { CotizacionesService } from '../../servicios/cotizaciones.service';
import { ProductosService } from '../../servicios/productos.service';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.scss']
})
export class CotizacionComponent implements OnInit {
  cotizaciones: any[] = [];
  productos: any[] = [];
  cotizacionActual: any = null;
  creandoNuevo: boolean = false;

  constructor(private cotizacionesService: CotizacionesService, private productosService: ProductosService) {}

  ngOnInit() {
    this.consultarCotizaciones();
    this.consultarProductos();
  }

  consultarCotizaciones() {
    this.cotizacionesService.consultarCotizaciones().subscribe(data => {
      this.cotizaciones = data;
    });
  }

  consultarProductos() {
    this.productosService.consultarProductos().subscribe(data => {
      this.productos = data;
    });
  }

  mostrarFormularioNuevo() {
    this.creandoNuevo = true;
    this.cotizacionActual = { titular: '', fecha: '', total: 0, descripcion: '', detalles: [{ producto_id: null, cantidad: 0, precio: 0 }] };
  }

  mostrarFormularioEditar(cotizacion: any) {
    this.creandoNuevo = false;
    this.cotizacionActual = JSON.parse(JSON.stringify(cotizacion));
    if (!this.cotizacionActual.detalles) {
      this.cotizacionActual.detalles = [{ producto_id: null, cantidad: 0, precio: 0 }];
    }
  }

  guardarCotizacion() {
    console.log('Cotización actual:', this.cotizacionActual); // Agregar para depuración
    
    // Definir los tipos explícitamente para `sum` y `detalle`
    this.cotizacionActual.total = this.cotizacionActual.detalles.reduce((sum: number, detalle: any) => {
      const cantidad = Number(detalle.cantidad) || 0;
      const precio = Number(detalle.precio) || 0;
      return sum + (cantidad * precio);
    }, 0);
  
    if (this.creandoNuevo) {
      this.cotizacionesService.crearCotizacion(this.cotizacionActual).subscribe(response => {
        if (response['resultado'] === 'Ok') {
          this.consultarCotizaciones();
          this.cancelarEdicion();
        } else {
          console.error('Error al guardar la cotización:', response['mensaje']);
        }
      }, error => {
        console.error('Error en la solicitud:', error);
      });
    } else {
      this.cotizacionesService.editarCotizacion(this.cotizacionActual).subscribe(response => {
        if (response['resultado'] === 'Ok') {
          this.consultarCotizaciones();
          this.cancelarEdicion();
        } else {
          console.error('Error al actualizar la cotización:', response['mensaje']);
        }
      }, error => {
        console.error('Error en la solicitud:', error);
      });
    }
  }

  eliminarCotizacion(id: number) {
    this.cotizacionesService.eliminarCotizacion(id).subscribe(() => {
      this.consultarCotizaciones();
    });
  }

  agregarDetalle() {
    this.cotizacionActual.detalles.push({ producto_id: null, cantidad: 0, precio: 0 });
  }

  actualizarPrecio(detalle: any) {
    const producto = this.productos.find(p => p.id === detalle.producto_id);
    if (producto) {
      detalle.precio = producto.precio;
    }
  }

  cancelarEdicion() {
    this.cotizacionActual = null;
    this.creandoNuevo = false;
  }
}
