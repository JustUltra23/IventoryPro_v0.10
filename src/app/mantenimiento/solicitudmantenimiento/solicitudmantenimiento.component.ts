import { Component, OnInit } from '@angular/core';
import { MantenimientoService } from '../../servicios/mantenimiento.service';

@Component({
  selector: 'app-solicitudmantenimiento',
  templateUrl: './solicitudmantenimiento.component.html',
  styleUrl: './solicitudmantenimiento.component.scss'
})

export class SolicitudmantenimientoComponent implements OnInit {
  nuevaSolicitud = {
    tienda_id: '',
    fecha_solicitud: '',
    descripcion: '',
    estado: 'creada'
  };
  tiendas: any[] = [];
  mensaje: string = '';
  success: boolean = false;

  constructor(private mantenimientoService: MantenimientoService) {}

  ngOnInit() {
    this.obtenerTiendas();
  }

  obtenerTiendas() {
    this.mantenimientoService.obtenerTiendas().subscribe(data => {
      this.tiendas = data;
    });
  }

  generarSolicitud() {
    this.mantenimientoService.crearSolicitud(this.nuevaSolicitud).subscribe(response => {
      if (response.message === 'Solicitud creada') {
        this.success = true;
        this.mensaje = 'Solicitud creada correctamente.';
        this.resetFormulario(); // Reiniciar formulario
      } else {
        this.success = false;
        this.mensaje = response.message; // Mostrar mensaje de error
      }
    });
  }

  resetFormulario() {
    this.nuevaSolicitud = {
      tienda_id: '',
      fecha_solicitud: '',
      descripcion: '',
      estado: 'creada'
    };
  }
}