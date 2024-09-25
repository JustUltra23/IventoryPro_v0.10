import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Asegúrate de tener un servicio de autenticación

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

   async canActivate(): Promise<boolean> {
    const isAuthenticated = await this.authService.isAuthenticated(); // Usar await aquí
    if (!isAuthenticated) {
      this.router.navigate(['/login']); // Redirigir al login si no está autenticado
      return false; // Denegar acceso
    }
    return true; // Permitir acceso
  }
}
