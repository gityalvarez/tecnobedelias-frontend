import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../../shared/login/login.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { AuthGuardService } from '../../_services/auth-guard.service';
import { RoleGuardService } from '../../_services/role-guard.service';
import { HomeComponent } from '../../admin/home/home.component';
import { UsuarioFormComponent } from '../../admin/usuario-form/usuario-form.component';
import { HomeDirectorComponent } from '../../director/home-director/home-director.component';
import { HomeStudentComponent } from '../../student/home-student/home-student.component';
import { CarreraFormComponent } from 'src/app/director/carrera-form/carrera-form.component';
import { AsignaturaFormComponent } from 'src/app/director/asignatura-form/asignatura-form.component';
import { AsignarAsignaturaComponent } from 'src/app/director/asignar-asignatura/asignar-asignatura.component';
import { ResetComponent } from 'src/app/shared/reset/reset.component';
import { PerfilComponent } from 'src/app/student/perfil/perfil.component';
import { AsignaturaEditarComponent } from 'src/app/director/asignatura-editar/asignatura-editar.component';
import { CarreraEditarComponent } from 'src/app/director/carrera-editar/carrera-editar.component';
import { UsuarioEditarComponent } from 'src/app/admin/usuario-editar/usuario-editar.component';
import { CambiarPasswordComponent } from 'src/app/shared/cambiar-password/cambiar-password.component';

const routes: Routes = [

  { path: '', component: LoginComponent},

  { 
    path: 'administrador', 
    component: HomeComponent,
    canActivate: [AuthGuardService,RoleGuardService], 
    data: { 
      expectedRole: "administrador"
    } 
  },
  { 
    path: 'estudiante', 
    component: HomeStudentComponent, 
    canActivate: [AuthGuardService,RoleGuardService], 
    data: { 
      expectedRole: "estudiante"
    } 
  },
  { 
    path: 'director', 
    component: HomeDirectorComponent, 
    canActivate: [AuthGuardService,RoleGuardService], 
    data: { 
      expectedRole: "director"
    } 
  },
  { path: 'administrador/usuario-form', component: UsuarioFormComponent},
  { path: 'director/carrera-form', component: CarreraFormComponent},
  { path: 'director/asignatura-form', component: AsignaturaFormComponent},
  { path: 'estudiante/perfil', component: PerfilComponent},
  { path: 'reset', component: ResetComponent},
  { path: 'director/asignatura-editar', component: AsignaturaEditarComponent},
  { path: 'director/carrera-editar', component: CarreraEditarComponent},
  { path: 'administrador/usuario-editar', component: UsuarioEditarComponent},
  { path: 'director/cambiar-password', component: CambiarPasswordComponent},
  { path: 'estudiante/cambiar-password', component: CambiarPasswordComponent},
  { path: 'administrador/cambiar-password', component: CambiarPasswordComponent},

    { path: '**', redirectTo: '' }

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
