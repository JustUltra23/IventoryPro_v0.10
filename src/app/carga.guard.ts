import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CargaGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
    const isAuthenticated = await this.authService.isAuthenticated(); // Verifica si el usuario está autenticado
    if (isAuthenticated) {
      return true; // Permitir carga
    } else {
      this.router.navigate(['/login']); // Redirigir al login si no está autenticado
      return false; // Bloquear carga
    }
  }
}

