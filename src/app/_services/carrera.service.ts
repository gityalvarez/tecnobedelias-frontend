import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Carrera } from '../_models/Carrera';
import { Asignatura } from '../_models/Asignatura';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  private carrera = new Carrera();

  constructor(private http:HttpClient) { }

  getCarreras():Observable<any>{
    return this.http.get(environment.API+'/carrera/listar');
  }

  agregarCarrera(carrera:Carrera):Observable<any>{
    console.log('entre al agregarCarreraService con la carrera '+carrera.nombre );
    return this.http.post(environment.API+'/carrera/crear',carrera);
  }

  borrarCarrera(carrera:Carrera):Observable<any>{
    console.log('entre al borrarCarrera del carreraService con la carrera '+carrera.nombre);
    return this.http.post(environment.API+'/carrera/borrar',carrera); 

  }

  asignarAsignatura(carrera:Carrera,asignatura:Asignatura){
    console.log("entre al asignarAsignatura del carreraSErvice con la carrera "+carrera.nombre+" y la asignatura "+asignatura.nombre);
    return this.http.get(environment.API+'/carrera/asignarasignatura',{params: {'carrera': carrera.nombre,'asignatura':asignatura.nombre}});

  }

  desasignarAsignatura(carrera:Carrera,asignatura:Asignatura){
    console.log("entre al desasignarAsignatura del carreraSErvice con la carrera "+carrera.nombre+" y la asignatura "+asignatura.nombre);
    return this.http.get(environment.API+'/carrera/desasignarasignatura',{params: {'carrera': carrera.nombre,'asignatura':asignatura.nombre}});

  }

  set(carrera:Carrera){
    this.carrera=carrera;
  }

  get(){
    return this.carrera;
  }
  
}
