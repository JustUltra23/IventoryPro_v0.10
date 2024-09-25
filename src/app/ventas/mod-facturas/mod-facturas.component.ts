import { Component } from '@angular/core';
import { VentasService } from '../../servicios/ventas.service';

@Component({
  selector: 'app-mod-facturas',
  templateUrl: './mod-facturas.component.html',
  styleUrl: './mod-facturas.component.scss'
})
export class ModFacturasComponent {

  ventaId: number | null = null; // ID de la venta a buscar
  venta: any = null; // Almacena los detalles de la venta (ID, fecha, cliente, total)
  detallesVenta: any[] = []; // Almacena los detalles de la venta (productos)
  totalVenta: number = 0; // Total de la venta
  mensaje: string = ''; // Mensajes de éxito o error
  cargando: boolean = false; // Indicador para mostrar que la acción está en progreso
  editando: boolean = false; // Indica si se está editando la venta

  constructor(private ventasService: VentasService) {}

  // Método para buscar la venta por ID
  buscarVenta() {
    if (this.ventaId) {
      this.cargando = true;
      this.ventasService.buscarVenta(this.ventaId).subscribe(
        (response: any) => {
          this.cargando = false;
          if (response && response.venta) {
            this.venta = response.venta;
            this.detallesVenta = response.detalles;
            this.totalVenta = response.venta.total;
          } else {
            this.mensaje = 'No se encontró la venta';
          }
        },
        (error) => {
          this.mensaje = 'Error al buscar la venta';
          this.cargando = false;
        }
      );
    }
  }

  eliminarDetalle(detalleId: number) {
    if (!detalleId) {
      this.mensaje = 'ID de detalle no proporcionado LLAMADO DE TS';
      return; // No continuamos si no hay ID
    }
    
    this.cargando = true;
    
    this.ventasService.eliminarDetalleVenta({ detalle_id: detalleId }).subscribe(
      (response: any) => {
        this.cargando = false;
        console.log('Respuesta del servidor:', response); // Log para revisar la respuesta
        if (response.resultado === 'Éxito') {
          this.mensaje = 'Detalle de venta eliminado con éxito';
          // Actualizar la lista de detalles de venta
          this.detallesVenta = this.detallesVenta.filter(detalle => detalle.id !== detalleId);
        } else {
          this.mensaje = response.error || 'Error al eliminar el detalle de la venta';
        }
      },
      (error) => {
        console.error('Error al eliminar el detalle de la venta:', error); // Log del error
        this.mensaje = 'Error al eliminar el detalle de la venta';
        this.cargando = false;
      }
    );
  }
  




// Método para cambiar el EAN de un producto
cambiarEAN(detalleId: number, nuevoEan: string) {
  if (!nuevoEan) {
    this.mensaje = 'EAN no proporcionado';
    return; // Si no hay nuevo EAN, salimos del método
  }
  this.cargando = true;
  this.ventasService.cambiarProductoVenta(detalleId, nuevoEan).subscribe(
    (response: any) => {
      this.cargando = false;
      if (response.resultado === 'Éxito') {
        this.mensaje = 'EAN cambiado con éxito';
        // Actualizar la EAN en detallesVenta
        const detalle = this.detallesVenta.find(d => d.id === detalleId);
        if (detalle) {
          detalle.codigo_ean = nuevoEan; // Actualiza el EAN en el detalle
        }
      } else {
        this.mensaje = response.error || 'Error al cambiar el EAN';
      }
    },
    (error) => {
      this.mensaje = 'Error al cambiar el EAN';
      this.cargando = false;
    }
  );
}

  // Método para guardar los cambios en la venta
  guardarVenta() {
    if (this.ventaId) {
      this.cargando = true;
      this.ventasService.modificarVenta(this.ventaId, this.detallesVenta, this.totalVenta).subscribe(
        (response: any) => {
          this.cargando = false;
          if (response.resultado === 'Éxito') {
            this.mensaje = 'Venta modificada con éxito';
            this.editando = false; // Desactivar el modo de edición
          } else {
            this.mensaje = response.mensaje || 'Error al modificar la venta';
          }
        },
        (error) => {
          this.mensaje = 'Error al modificar la venta';
          this.cargando = false;
        }
      );
    }
  }

  // Método para activar la edición de EAN y cantidad
activarEdicion(detalle: any) {
  detalle.editando = true; // Habilita la edición del detalle seleccionado
}

  // Método para modificar la venta
  modificarVenta() {
    this.editando = true;
  }

  // Método para eliminar la venta completa
  eliminarVenta() {
    if (this.ventaId) {
      this.cargando = true;
      this.ventasService.eliminarVenta(this.ventaId).subscribe(
        (response: any) => {
          this.cargando = false;
          if (response.resultado === 'Éxito') {
            this.mensaje = 'Venta eliminada con éxito';
            this.venta = null; // Limpiar la venta
            this.detallesVenta = []; // Limpiar los detalles de la venta
            this.totalVenta = 0; // Reiniciar el total
          } else {
            this.mensaje = response.mensaje || 'Error al eliminar la venta';
          }
        },
        (error) => {
          this.mensaje = 'Error al eliminar la venta';
          this.cargando = false;
        }
      );
    }
  }

  // Método para cancelar la edición
  cancelarEdicion() {
    this.editando = false;
    this.buscarVenta(); // Volver a cargar la venta original
  }
}