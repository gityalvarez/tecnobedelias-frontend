import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Carrera } from '../_models/Carrera';
import { Asignatura } from '../_models/Asignatura';
import { Asignatura_Carrera } from '../_models/Asignatura_Carrera';

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
    return this.http.post(environment.API+'/carrera/borrar',{params:{'carrera': carrera.nombre}}); 

  }

  modificarCarrera(carrera:Carrera):Observable<any>{
    return this.http.post(environment.API+'/carrera/modificar',carrera,{params:{'carreraId': carrera.id.toString()}});
  }

  getAsignaturas(carrera:Carrera):Observable<any>{
    return this.http.get(environment.API+'/carrera/listarasignaturas/'+carrera.nombre)
  }

  getAsignaturasFaltantes(carrera:Carrera):Observable<any>{
    return this.http.get(environment.API+'/carrera/listarasignaturasfaltantes/'+carrera.nombre);
  }

  asignarAsignatura(carrera:Carrera,asignatura:Asignatura,asignaturaCarrera:Asignatura_Carrera){
    console.log("entre al asignarAsignatura del carreraSErvice con la carrera "+carrera.nombre+" y la asignatura "+asignatura.nombre);
    return this.http.post(environment.API+'/carrera/asignarasignatura',asignaturaCarrera,{params: {'carrera': carrera.nombre,'asignatura':asignatura.nombre}});

  }

  desasignarAsignatura(carrera:Carrera,asignatura:Asignatura){
    console.log("entre al desasignarAsignatura del carreraSErvice con la carrera "+carrera.nombre+" y la asignatura "+asignatura.nombre);
    return this.http.get(environment.API+'/carrera/desasignarasignatura',{params: {'carrera': carrera.nombre,'asignatura':asignatura.nombre}});

  }

  
  getPrevias(asignatura:Asignatura,carrera:Carrera):Observable<any>{
    console.log('entre al getPrevias del asignaturaService con la asignatura '+asignatura.nombre+' y la carrera '+carrera.nombre);
    return this.http.get(environment.API+'/carrera/listarpreviaturas',{params:{'carrera':carrera.nombre,'asignatura':asignatura.nombre}}); 

  }

  getPreviasPosibles(asignatura:Asignatura,carrera:Carrera):Observable<any>{
    console.log('entre al getPreviasPosibles del carreraService con la asignatura '+asignatura.nombre+' y la carrera '+carrera.nombre);
    return this.http.get(environment.API+'/carrera/listarpreviaturasposibles',{params:{'carrera':carrera.nombre,'asignatura':asignatura.nombre}}); 

  }

  asignarPrevia(carrera:Carrera,asignatura:Asignatura,asignaturaPrevia:Asignatura){
    console.log("entre al asignarPrevia del carreraSErvice con la carrera "+carrera.nombre+"  la asignatura "+asignatura.nombre+" y la previa "+asignaturaPrevia.nombre);
    return this.http.get(environment.API+'/carrera/asignarprevia',{params: {'carrera': carrera.nombre,'asignatura':asignatura.nombre,'asignaturaPrevia':asignaturaPrevia.nombre}});
  }

  desasignarPrevia(carrera:Carrera,asignatura:Asignatura,asignaturaPrevia:Asignatura){
    console.log("entre al desasignarPrevia del carreraSErvice con la carrera "+carrera.nombre+"  la asignatura "+asignatura.nombre+" y la previa "+asignaturaPrevia.nombre);
    return this.http.get(environment.API+'/carrera/desasignarprevia',{params: {'carrera': carrera.nombre,'asignatura':asignatura.nombre,'asignaturaPrevia':asignaturaPrevia.nombre}});
  }

  getNodos(carrera:string):Observable<any>{
    return this.http.get(environment.API+'/carrera/asignaturasgrafo',{params:{'carrera':carrera}});

  }

  getLinks(carrera:string):Observable<any>{
    return this.http.get(environment.API+'/carrera/linksgrafo',{params:{'carrera':carrera}});

  }

  


  set(carrera:Carrera){
    this.carrera=carrera;
  }

  get(){
    return this.carrera;
  }
  
}
