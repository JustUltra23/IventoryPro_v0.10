import { Component, OnInit } from '@angular/core';
import { ContabilidadService } from '../../servicios/contabilidad.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-conciliaciones',
  templateUrl: './conciliaciones.component.html',
  styleUrl: './conciliaciones.component.scss'
})
export class ConciliacionesComponent implements OnInit {
  conciliaciones: any[] = [];
  conciliacion = {
    id: null,
    fecha: '',
    cuenta_bancaria: '',
    usuario_id: null,
    saldo_libros: 0,
    saldo_banco: 0,
    estado: 'pendiente'
  };

  constructor(
    private contabilidadService: ContabilidadService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.obtenerConciliaciones();
    this.cargarDatosUsuario(); // Llama a este método
  }

  async cargarDatosUsuario() {
    try {
      const user = await this.authService.getUser(); // Asegúrate de que este método exista en AuthService
      if (user) {
        console.log('Usuario obtenido desde el AuthService:', user);
        this.conciliacion.usuario_id = user.user_id; // Asignar el ID del usuario
        console.log('usuario_id asignado:', this.conciliacion.usuario_id);
      } else {
        console.error('No se pudo obtener el usuario');
      }
    } catch (error) {
      console.error('Error al cargar los datos del usuario:', error);
    }
  }

  obtenerConciliaciones() {
    this.contabilidadService.obtenerConciliaciones().subscribe(data => {
      if (Array.isArray(data)) {
        this.conciliaciones = data;
      } else {
        console.error('La respuesta no es un array:', data);
        this.conciliaciones = [];
      }
    }, error => {
      console.error('Error al obtener conciliaciones:', error);
      this.conciliaciones = [];
    });
  }

  guardarConciliacion() {
    // No necesitas recalcular la diferencia aquí si lo haces en el HTML.
    if (this.conciliacion.id) {
      this.contabilidadService.editarConciliacion(this.conciliacion).subscribe(() => {
        this.obtenerConciliaciones();
        this.limpiarFormulario();
      }, error => {
        console.error('Error al editar conciliación:', error);
      });
    } else {
      this.contabilidadService.crearConciliacion(this.conciliacion).subscribe(() => {
        this.obtenerConciliaciones();
        this.limpiarFormulario();
      }, error => {
        console.error('Error al crear conciliación:', error);
      });
    }
  }

  editarConciliacion(conciliacion: any) {
    this.conciliacion = { 
      ...conciliacion, 
      usuario_id: this.conciliacion.usuario_id // Mantener el usuario_id del usuario logueado
    };
  }

  eliminarConciliacion(id: number) {
    this.contabilidadService.eliminarConciliacion(id).subscribe(() => {
      this.obtenerConciliaciones();
    }, error => {
      console.error('Error al eliminar conciliación:', error);
    });
  }

  limpiarFormulario() {
    this.conciliacion = {
      id: null,
      fecha: '',
      cuenta_bancaria: '',
      usuario_id: this.conciliacion.usuario_id,
      saldo_libros: 0,
      saldo_banco: 0,
      estado: 'pendiente'
    };
  }
}