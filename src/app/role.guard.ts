import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const requiredRoles = route.data['roles'] as Array<number>;
  
    const isAuthenticated = await this.authService.isAuthenticated(); // Esperar autenticación
    const userRole = await this.authService.getUserRole(); // Esperar el rol del usuario
  
    console.log('Authenticated:', isAuthenticated);
    console.log('User role (after conversion):', userRole);
    console.log('Required roles:', requiredRoles);
  
    // Asegurarte de que el rol no sea null y está en el array de roles permitidos
    if (isAuthenticated && userRole !== null && requiredRoles.includes(userRole)) {
      return true; // Acceso permitido
    } else {
      console.log('Acceso denegado. Redirigiendo al DASHBOARD por favor ingrese con rol correspondiente');
      this.router.navigate(['/error']); // Redirigir si no tiene el rol o no está autenticado
      return false;
    }
  }
}  

