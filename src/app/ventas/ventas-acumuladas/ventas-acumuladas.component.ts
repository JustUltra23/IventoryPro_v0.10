import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../servicios/ventas.service';


@Component({
  selector: 'app-ventas-acumuladas',
  templateUrl: './ventas-acumuladas.component.html',
  styleUrls: ['./ventas-acumuladas.component.scss']
})

export class VentasAcumuladasComponent implements OnInit {
  tiendas: any[] = [];
  ventas: any[] = [];
  tiendaSeleccionada: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
  vendedorIdentificacion: string = '';
  detallesVenta: any[] = []; // Para almacenar los detalles de la venta seleccionada

  constructor(private ventasService: VentasService) {}

  ngOnInit(): void {
    this.obtenerTiendas();
  }

  obtenerTiendas() {
    this.ventasService.obtenerTiendas().subscribe((tiendas) => {
      this.tiendas = tiendas;
    });
  }

  consultarVentas() {
    const formattedFechaInicio = new Date(this.fechaInicio).toISOString().split('T')[0];
    const formattedFechaFin = new Date(this.fechaFin).toISOString().split('T')[0];

    if (this.vendedorIdentificacion) {
      // Obtener el ID del vendedor basado en la identificación ingresada
      this.ventasService.obtenerVendedorPorIdentificacion(this.vendedorIdentificacion).subscribe({
        next: (vendedor: any) => {
          const vendedorId = vendedor.id;
          this.realizarConsultaVentas(formattedFechaInicio, formattedFechaFin, vendedorId);
        },
        error: (error) => {
          console.error('Error al obtener el vendedor:', error);
        }
      });
    } else {
      // Si no se ingresa una identificación de vendedor, se hace la consulta sin este filtro
      this.realizarConsultaVentas(formattedFechaInicio, formattedFechaFin, null);
    }
  }

  // Método para ver los detalles de la venta
  verDetalles(ventaId: number) {
    this.ventasService.obtenerDetallesVenta(ventaId).subscribe(data => {
      this.detallesVenta = data;
    });
  }

  realizarConsultaVentas(fechaInicio: string, fechaFin: string, vendedorId: string | null) {
    const filtros = {
      tienda_id: this.tiendaSeleccionada,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
      vendedor_id: vendedorId // Si no se proporciona vendedor, se envía null
    };

    console.log("Filtros enviados:", filtros);

    this.ventasService.consultarVentas(filtros).subscribe({
      next: (ventas) => {
        console.log("Ventas recibidas:", ventas);
        this.ventas = ventas;
      },
      error: (error) => {
        console.error("Error en la consulta de ventas:", error);
      }
    });
  }
}