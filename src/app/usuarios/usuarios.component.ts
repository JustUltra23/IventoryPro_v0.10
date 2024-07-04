import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];
  usuarioActual: any = null;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.consultar().subscribe((data: any) => {
      this.usuarios = data;
    });
  }

  eliminarUsuario(id: number) {
    this.usuarioService.eliminar(id).subscribe((response: any) => {
      if (response.resultado === 'Ok') {
        this.cargarUsuarios();
      }
    });
  }

  mostrarFormularioEditar(usuario: any) {
    this.usuarioActual = { ...usuario }; // Crear una copia del usuario
  }

  actualizarUsuario() {
    this.usuarioService.edit(this.usuarioActual).subscribe((response: any) => {
      if (response.resultado === 'Ok') {
        this.cargarUsuarios();
        this.usuarioActual = null; // Ocultar el formulario después de actualizar
      }
    });
  }

  cancelarEdicion() {
    this.usuarioActual = null; // Ocultar el formulario sin hacer cambios
  }
}

