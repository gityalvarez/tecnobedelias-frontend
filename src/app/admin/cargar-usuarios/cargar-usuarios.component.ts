import { Component, OnInit, TemplateRef } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { Usuario } from 'src/app/_models/Usuario';
import { UsuarioService } from 'src/app/_services/usuario.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

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

  constructor(private papa: Papa, private usuarioService: UsuarioService,private modalService: BsModalService) {}


  ngOnInit() {  
  }

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
  

  cargar(){
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
          if(data){
            console.log("agregué al usuario "+usuario.username)
          }else{
            console.log("No se pudo  agregar al usuario "+usuario.username)
          }
        }
      );
    });
  } 
  
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}



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