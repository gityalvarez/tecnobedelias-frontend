import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { LoginComponent } from './shared/login/login.component';
import { RoutingModule } from './_helpers/routing/routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './_helpers/AuthInterceptor';
import { AuthService } from './_services/auth.service';
import { UsuarioService } from './_services/usuario.service';
import { TokenStorage } from './_helpers/TokenStorage';
import { AuthGuardService } from './_services/auth-guard.service';
import { RoleGuardService } from './_services/role-guard.service';
import { HomeComponent } from './admin/home/home.component';
import { BodyComponent } from './admin/body/body.component';
import { ListaUsuariosComponent } from './admin/lista-usuarios/lista-usuarios.component';
import { UsuarioFormComponent } from './admin/usuario-form/usuario-form.component';
import { BsDatepickerModule, BsModalService, ModalModule, AlertModule} from 'ngx-bootstrap';
import { ListaCarrerasComponent } from './director/lista-carreras/lista-carreras.component';
import { HomeDirectorComponent } from './director/home-director/home-director.component';
import { BodyDirectorComponent } from './director/body-director/body-director.component';
import { ListaAsignaturasComponent } from './director/lista-asignaturas/lista-asignaturas.component';
import { HomeStudentComponent } from './student/home-student/home-student.component';
import { BodyStudentComponent } from './student/body-student/body-student.component';
import { CedulaPipe } from './_pipes/CedulaPipe';
import { FilterPipe } from './_pipes/FilterPipe';
import { CarreraFormComponent } from './director/carrera-form/carrera-form.component';
import { CarreraService } from './_services/carrera.service';
import { AsignaturaService } from './_services/asignatura.service';
import { AsignaturaFormComponent } from './director/asignatura-form/asignatura-form.component';
import { AsignarAsignaturaComponent } from './director/asignar-asignatura/asignar-asignatura.component';
import { AccordionModule } from 'ngx-bootstrap';
import { AsignarPreviaComponent } from './director/asignar-previa/asignar-previa.component';
import { PickListModule } from 'primeng/picklist';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResetComponent } from './shared/reset/reset.component';
import { GrafoComponent } from './director/grafo/grafo.component';
import { InscripcionService } from './_services/inscripcion.service';
import { ListaCursosComponent } from './student/lista-cursos/lista-cursos.component';
import { ListaExamenesComponent } from './student/lista-examenes/lista-examenes.component';
import { CargarUsuariosComponent } from './admin/cargar-usuarios/cargar-usuarios.component';
import { PapaParseModule } from 'ngx-papaparse';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { FullCalendarModule } from 'ng-fullcalendar';
import { CalendarioComponent } from './student/calendario/calendario.component';
import { EventService } from './student/calendario/event.service';
import * as $ from 'jquery';
import * as go from 'gojs';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfilComponent } from './student/perfil/perfil.component';
import { AsignaturaEditarComponent } from './director/asignatura-editar/asignatura-editar.component';
import { CarreraEditarComponent } from './director/carrera-editar/carrera-editar.component';
import { UsuarioEditarComponent } from './admin/usuario-editar/usuario-editar.component';
import {GrowlModule} from 'primeng/growl';
import {ToggleButtonModule} from 'primeng/togglebutton';
import { ListaPreviasComponent } from './director/lista-previas/lista-previas.component';
import { CambiarPasswordComponent } from './shared/cambiar-password/cambiar-password.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    BodyComponent,
    ListaUsuariosComponent,
    UsuarioFormComponent,
    ListaCarrerasComponent,
    HomeDirectorComponent,
    BodyDirectorComponent,
    ListaAsignaturasComponent,
    HomeStudentComponent,
    BodyStudentComponent,
    CedulaPipe,
    FilterPipe,
    CarreraFormComponent,
    AsignaturaFormComponent,
    AsignarAsignaturaComponent,
    AsignarPreviaComponent,
    ResetComponent,
    GrafoComponent,
    ListaCursosComponent,
    ListaExamenesComponent,
    CargarUsuariosComponent,
    CalendarioComponent,
    PerfilComponent,
    AsignaturaEditarComponent,
    CarreraEditarComponent,
    UsuarioEditarComponent,
    ListaPreviasComponent,
    CambiarPasswordComponent

  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    BsDatepickerModule.forRoot(),
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    PickListModule,
    BrowserAnimationsModule,
    PapaParseModule,
    FileUploadModule,
    DialogModule,
    FullCalendarModule,
    DropdownModule,
    CheckboxModule,
    NgbModule,
    GrowlModule,
    ToggleButtonModule

  ],
  providers: [
    AuthInterceptor,
    AuthService,
    AuthGuardService,
    RoleGuardService,
    UsuarioService,
    CarreraService,
    AsignaturaService,
    BsModalService,
    TokenStorage,
    InscripcionService,
    { provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true },
    EventService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
