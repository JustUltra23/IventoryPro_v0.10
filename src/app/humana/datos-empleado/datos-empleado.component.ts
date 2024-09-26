import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { DatosEmpleadosService } from '../../servicios/datos-empleados.service';

// Define la interfaz Usuario
interface Usuario {
  id: number; // Asegúrate de que el tipo coincida con la base de datos
}

@Component({
  selector: 'app-datos-empleado',
  templateUrl: './datos-empleado.component.html',
  styleUrl: './datos-empleado.component.scss'
})
export class DatosEmpleadoComponent implements OnInit {
  empleados: any[] = [];
  empleado: any = {
    usuario_id: '',
    fecha_nacimiento: '',
    direccion: '',
    estado_civil: '',
    fecha_ingreso: '',
    familiar_emergencia: '',
    relacion_familiar: '',
    telefono_emergencia: ''
  };
  isEditing = false;

  constructor(
    private datosEmpleadosService: DatosEmpleadosService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarDatosUsuario(); // Llamar a tu nuevo método para cargar datos del usuario
    }
  
    async cargarDatosUsuario() {
      try {
        const user = await this.authService.getUser();
        if (user) {
          console.log('Usuario obtenido desde el AuthService:', user);
          this.empleado.usuario_id = user.user_id; // Asignar el ID del usuario
          console.log('usuario_id asignado:', this.empleado.usuario_id);
          
          this.cargarEmpleados(); // Llamar a cargarEmpleados después de cargar el usuario
        } else {
          console.error('No se pudo obtener el usuario');
        }
      } catch (error) {
        console.error('Error al cargar los datos del usuario:', error);
      }
    }
  
  cargarEmpleados(): void {
    this.datosEmpleadosService.obtenerEmpleados().subscribe((data: any) => {
      this.empleados = data;
    });
  }

  crearEmpleado(): void {
    this.datosEmpleadosService.crearEmpleado(this.empleado).subscribe(() => {
      this.cargarEmpleados();
      this.limpiarFormulario();
    });
  }

  actualizarEmpleado(): void {
    console.log('Datos del empleado a actualizar:', this.empleado); // Añade esto para depuración
    this.datosEmpleadosService.actualizarEmpleado(this.empleado).subscribe(() => {
      this.cargarEmpleados();
      this.limpiarFormulario();
      this.isEditing = false;
    }, error => {
      console.error('Error al actualizar el empleado:', error); // Depuración en caso de error
    });
  }
  

  editarEmpleado(id: number): void {
    const empleadoSeleccionado = this.empleados.find(emp => emp.id === id);
    if (empleadoSeleccionado) {
      this.empleado = { ...empleadoSeleccionado };
      this.isEditing = true;
    }
  }

  eliminarEmpleado(id: number): void {
    this.datosEmpleadosService.eliminarEmpleado(id).subscribe(() => {
      this.cargarEmpleados();
    });
  }

  limpiarFormulario(): void {
    this.empleado = {
      usuario_id: this.empleado.usuario_id, // Mantener el usuario_id del empleado logueado
      fecha_nacimiento: '',
      direccion: '',
      estado_civil: '',
      fecha_ingreso: '',
      familiar_emergencia: '',
      relacion_familiar: '',
      telefono_emergencia: ''
    };
  }
}
