import { Component, OnInit } from '@angular/core';
import { ReportesEmpleadosService } from '../../servicios/reportes-empleados.service';
import { AuthService } from '../../auth.service';

// Define la interfaz Usuario
interface Usuario {
  id: number; // Asegúrate de que el tipo coincida con la base de datos
  identificacion: string;
}

@Component({
  selector: 'app-pqr',
  templateUrl: './pqr.component.html',
  styleUrl: './pqr.component.scss'
})
export class PqrComponent implements OnInit {
  pqr = {
    id: null, // Añadir id para la edición
    tipo: '',
    descripcion: '',
    estado: 'Creada', // Estado inicial
    usuario_id: null, // Este valor se debe asignar con el login
    fo_documento: '',
    fecha: '', // Añadir campo de fecha
    fo_tienda: null
  };



  tiposRequerimientos = ['Peticion', 'Queja', 'Reclamo', 'Solicitud'];
  tiendas: any[] = [];
  pqrs: any[] = []; // Lista de PQRS del usuario
  isEditing = false; // Nueva variable para controlar el estado de edición

  constructor(
    private reportesEmpleadosService: ReportesEmpleadosService,
    private authService: AuthService // Creacion del Authservice
  ) {}

  ngOnInit(): void {
    this.obtenerTiendas();
    this.cargarDatosUsuario(); // Llamar a tu nuevo método para cargar datos del usuario
  }

  async cargarDatosUsuario() {
    try {
      const user = await this.authService.getUser();
      if (user) {
        console.log('Usuario obtenido desde el AuthService:', user);
        this.pqr.usuario_id = user.user_id; // Asignar el ID del usuario
        this.pqr.fo_documento = user.identificacion; // Asignar la identificación directamente
        console.log('usuario_id asignado:', this.pqr.usuario_id);
        console.log('fo_documento asignado:', this.pqr.fo_documento);
        
        this.obtenerPQRS(); // Llamar a obtenerPQRS después de cargar el usuario
      } else {
        console.error('No se pudo obtener el usuario');
      }
    } catch (error) {
      console.error('Error al cargar los datos del usuario:', error);
    }
  }
  
  // Obtener tiendas
  obtenerTiendas(): void {
    this.reportesEmpleadosService.obtenerTiendas().subscribe(data => {
      this.tiendas = data;
    });
  }

  // Obtener PQRS del usuario autenticado
  obtenerPQRS(): void {
    const usuario_id = this.pqr.usuario_id;
    console.log('Consultando PQRS para usuario_id:', usuario_id); // Debug para verificar el usuario_id
    if (usuario_id != null) {
      this.reportesEmpleadosService.obtenerPQRS(usuario_id).subscribe(pqrs => {
        console.log('PQRS obtenidas:', pqrs); // Debug para ver los resultados
        this.pqrs = pqrs;
      }, error => {
        console.error('Error al obtener PQRS:', error);
        alert('No se pudieron cargar las PQRS. Intente más tarde.');
      });
    } else {
      console.error('Error: usuario_id es null o indefinido');
    }
  }


  // Crear nueva PQR
  crearPQR(): void {
    // Asegúrate de incluir la fecha actual si no está presente
    if (!this.pqr.fecha) {
      this.pqr.fecha = new Date().toISOString().split('T')[0]; // Fecha en formato YYYY-MM-DD
    }

    this.reportesEmpleadosService.crearPQR(this.pqr).subscribe(response => {
      alert('PQR creada con éxito');
      this.obtenerPQRS(); // Recargar PQRS después de crear
      this.limpiarFormulario(); // Limpiar el formulario
    });
  }

  // Editar PQR
editarPQR(id: number): void {
  const pqrSeleccionada = this.pqrs.find(pqr => pqr.id === id);
  if (pqrSeleccionada) {
    // Preservar usuario_id y fo_documento durante la edición
    this.pqr = { 
      ...pqrSeleccionada, 
      usuario_id: this.pqr.usuario_id, // Mantener el usuario_id del usuario logueado
      fo_documento: this.pqr.fo_documento // Mantener el documento del usuario
    }; 
    this.isEditing = true; // Cambiar a modo edición
  }
}


  // Actualizar PQR
  actualizarPQR(): void {
    if (!this.pqr.id) {
      alert('Error: No se puede actualizar la PQR, ID no definido.');
      return; // Salir si no hay ID
    }

    this.reportesEmpleadosService.editarPQR(this.pqr.id, this.pqr).subscribe(response => {
      alert('PQR actualizada con éxito');
      this.obtenerPQRS(); // Recargar PQRS después de editar
      this.limpiarFormulario(); // Limpiar el formulario
      this.isEditing = false; // Volver a modo creación
    });
  }

    // Limpiar formulario
    limpiarFormulario(): void {
    this.pqr.tipo = ''; // Reiniciar tipo
    this.pqr.descripcion = ''; // Reiniciar descripción
    this.pqr.fecha = ''; // Reiniciar fecha
    this.pqr.fo_tienda = null; // Reiniciar tienda
    this.isEditing = false; // Asegúrate de reiniciar el estado de edición
    // Mantener usuario_id y fo_documento
    }

  // Eliminar PQR
  eliminarPQR(id: number): void {
    this.reportesEmpleadosService.eliminarPQR(id).subscribe(response => {
      alert('PQR eliminada con éxito');
      this.obtenerPQRS(); // Recargar PQRS después de eliminar
    });
  }
}