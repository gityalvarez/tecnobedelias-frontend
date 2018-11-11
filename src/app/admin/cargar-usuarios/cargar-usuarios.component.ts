import { Component, OnInit, TemplateRef } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { Usuario } from 'src/app/_models/Usuario';
import { UsuarioService } from 'src/app/_services/usuario.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Message } from 'primeng/components/common/api';


@Component({
  selector: 'app-cargar-usuarios',
  templateUrl: './cargar-usuarios.component.html',
  styleUrls: ['./cargar-usuarios.component.css']
})
export class CargarUsuariosComponent implements OnInit {

  file:any;
  fileChanged(e) {
    this.file = e.target.files[0];
  }
  usuarios:Usuario[];
  resultado;
  modalRef: BsModalRef;
  msgs: Message[] = [];

  constructor(private papa: Papa, private usuarioService: UsuarioService,
    private modalService: BsModalService) {}


  ngOnInit() {  
  }

  onSelect(event){
    let reader = new FileReader();
    if(event.files && event.files.length > 0) {
      console.log("entre despues del")
      let file = event.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log("estoy en el onload "+reader.result);
        this.papa.parse(file,{
          header: false,
          skipEmptyLines: true,
          complete: (result) => {
            this.resultado = result.data
          }
        })
      };
    }

  }
  /*
  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log("estoy en el onload "+reader.result);
        this.papa.parse(file,{
          header: false,
          skipEmptyLines: true,
          complete: (result) => {
            this.resultado = result.data
          }
        })
      };
    }
  }
  */

 myUploader(event){
    console.log("entre al cargar")
    this.resultado.forEach(element => {
      let usuario:Usuario = new Usuario();
      usuario.nombre = element[0]
      usuario.apellido = element[1]
      usuario.cedula = element[2] 
      usuario.username = element[3]
      usuario.password = element[4]
      usuario.email = element[5]
      usuario.fechaNacimiento = new Date(element[6])
      this.usuarioService.agregarUsuario(element[7],usuario).subscribe(
        (data)=>{
          if(data.estado){
            //console.log(data.mensaje)
            //alert(data.mensaje)
            this.msgs = [];
            this.msgs.push({severity:'success', summary:'Exito', detail:data.mensaje});
            
          }else{
            //console.log(data.mensaje)
            //alert(data.mensaje)
            this.msgs = [];
            this.msgs.push({severity:'error', summary:'Error', detail:data.mensaje});
          }
        }
      );
    });
  } 

}























/*
openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template);
}
*/

/*



this.usuarioService.agregarUsuario(element[7],usuario).subscribe(
                (data)=>{
                  if(data){
                    console.log("agregué al usuario "+usuario.username)
                  }else{
                    console.log("No se pudo  agregar al usuario "+usuario.username)
                  }
                }
              );






    this.papa.parse(file,{
          header: false,
          skipEmptyLines: true,
          complete: (result) => {
              console.log('Parsed: ', result);
              console.log("el nombre del primero es "+result.data[1][0])
              //let usuario = result.data[1];
              result.data.forEach(element => {
              let usuario:Usuario = new Usuario();
              usuario.nombre = element[0]
              usuario.apellido = element[1]
              usuario.cedula = element[2] 
              usuario.username = element[3]
              usuario.password = element[4]
              usuario.email = element[5]
              usuario.fechaNacimiento = new Date(element[6])
              this.usuarios.push(usuario)           
              });
          }
        });








this.papa.parse(fileInput.files[0],{
      complete: function(results){
        console.log(results);
      }
    })
*/