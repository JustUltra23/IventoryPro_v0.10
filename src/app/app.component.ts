import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Corrige el nombre de la propiedad a "styleUrls"
})
export class AppComponent {
  title = 'IventoryPro';

  constructor(private authService: AuthService, private router: Router) {
    this.authService.init(); // Inicializar el servicio
    this.checkLoginStatus(); // Verificar el estado de inicio de sesión
  }

  async checkLoginStatus() {
    // Verificar si el usuario está autenticado cuando la aplicación se carga
    const isLoggedIn = await this.authService.isAuthenticated(); // Obtener el resultado
    if (isLoggedIn) {
      this.router.navigate(['/dashboard']); // Redirigir si está autenticado
    } else {
      this.router.navigate(['/login']); // Redirigir al login si no lo está
    }
  }
}

