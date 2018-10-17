import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Asignatura } from '../_models/Asignatura';
import { Carrera } from '../_models/Carrera';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  private asignatura = new Asignatura();

  constructor(private http:HttpClient) { }

  getAsignaturas():Observable<any>{
    return this.http.get(environment.API+'/asignatura/listar');
  }

  getAsignaturasFaltantes(carrera:Carrera):Observable<any>{
    return this.http.get(environment.API+'/carrera/listarFaltantes/'+carrera.nombre);
  }


  agregarAsignatura(asignatura:Asignatura):Observable<any>{
    console.log('entre al agregarAsignaturaService con la asignatura '+asignatura.nombre );
    return this.http.post(environment.API+'/asignatura/crear',asignatura);
  }

  borrarAsignatura(asignatura:Asignatura):Observable<any>{
    console.log('entre al borrarAsignatura del asignaturaService con la asignatura '+asignatura.nombre);
    return this.http.post(environment.API+'/asignatura/borrar',asignatura); 

  }


  set(asignatura:Asignatura){
    this.asignatura=asignatura;
  }

  get(){
    return this.asignatura;
  }
}
