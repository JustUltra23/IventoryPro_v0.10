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

  passwordMismatch: boolean = false;
  emailExists: boolean = false;
  userExists: boolean = false;
  idExists: boolean = false;

  constructor(private usuarioService: UsuarioService) {}

  ingresar() {
    this.passwordMismatch = this.user.contrasena !== this.user.confirmar_contrasena;

    if (this.passwordMismatch) {
        return; // Detener el registro si las contraseñas no coinciden
    }

    // Validar si el correo, usuario o identificación ya están registrados
    this.usuarioService.validarDatos(this.user).subscribe(
        (response: any) => {
            this.emailExists = response.emailExists;
            this.userExists = response.userExists;
            this.idExists = response.idExists;

            // Mostrar los mensajes de error
            if (response.errors.length > 0) {
                alert(response.errors.join('\n')); // Mostrar todos los errores
                return; // Detener el registro si hay errores
            }

            // Si todo está bien, registrar al usuario
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
        },
        error => {
            console.error(error);
            alert('Ocurrió un error al validar los datos');
        }
    );
  }
}
