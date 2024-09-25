import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  userRole: number | null = null;
  isLoggedIn: boolean = false; // Variable para verificar si el usuario está autenticado

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit(): Promise<void> { // Cambia la firma a async
    // Suscribirse a los cambios de estado de inicio de sesión
    this.authService.isLoggedIn$.subscribe(async status => {
      this.isLoggedIn = status; // Actualizar el estado
      if (this.isLoggedIn) {
        // Obtener el rol del usuario después de iniciar sesión
        this.userRole = await this.authService.getUserRole(); // Espera el resultado
      }
    });
  }
  
  logout() {
    this.authService.logout(); // Llamar al método logout
    
    // Redirigir al login después de cerrar sesión
    this.router.navigate(['/login']);
  }

  // Función que verifica si el rol es permitido para gestión humana
  isAllowedForHumanResources(): boolean {
    const allowedRoles = [1, 2, 3, 4, 5 , 6, 7, 8]; // Definir los roles permitidos
    return this.userRole !== null && allowedRoles.includes(this.userRole);
  }

  // Función que verifica si el rol es permitido para mantenimiento
  isAllowedForMantenimiento(): boolean {
    const allowedRoles = [1, 4, 7]; // Definir los roles permitidos
    return this.userRole !== null && allowedRoles.includes(this.userRole);
  }

  // Función que verifica si el rol es permitido para Inventarios
  isAllowedForInventarios(): boolean {
    const allowedRoles = [1, 2, 3, 4, 6]; // Definir los roles permitidos
    return this.userRole !== null && allowedRoles.includes(this.userRole);
  }

  // Función que verifica si el rol es permitido para Compras
  isAllowedForCompras(): boolean {
    const allowedRoles = [1, 3, 4, 5, 6]; // Definir los roles permitidos
    return this.userRole !== null && allowedRoles.includes(this.userRole);
  }

  // Función que verifica si el rol es permitido Ventas
  isAllowedForVentas(): boolean {
    const allowedRoles = [1, 2, 3, 4, 5 , 6]; // Definir los roles permitidos
    return this.userRole !== null && allowedRoles.includes(this.userRole);
  }

  // Función que verifica si el rol es permitido para contabilidad
  isAllowedForContabilidad(): boolean {
    const allowedRoles = [1, 4, 5]; // Definir los roles permitidos
    return this.userRole !== null && allowedRoles.includes(this.userRole);
  }

  // Función que verifica si el rol es permitido para administracion
  isAllowedForAdministracion(): boolean {
    const allowedRoles = [1, 4, 8]; // Definir los roles permitidos
    return this.userRole !== null && allowedRoles.includes(this.userRole);
  }

  // Función que verifica si el rol es permitido para usuarios
  isAllowedForUsuarios(): boolean {
    const allowedRoles = [1, 4]; // Definir los roles permitidos
    return this.userRole !== null && allowedRoles.includes(this.userRole);
  }

}