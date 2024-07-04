import { Component } from '@angular/core';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  user = {
    nombre_usuario: '',
    nombre_completo: '',
    correo_electronico: '',
    identificacion: '',
    celular: '',
    contrasena: '',
    confirmar_contrasena: '',
    rol_id: 2 // Ajusta este valor según tu lógica
  };

  constructor(private usuarioService: UsuarioService) {}

  ingresar() {
    if (this.user.contrasena !== this.user.confirmar_contrasena) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    this.usuarioService.insertar(this.user).subscribe(
      (datos: any) => {
        if (datos['resultado'] === 'Ok') {
          alert(datos['mensaje']);
        } else {
          alert('Error al insertar el usuario');
        }
      },
      error => {
        console.error(error);
        alert('Ocurrió un error al insertar el usuario');
      }
    );
  }
}

