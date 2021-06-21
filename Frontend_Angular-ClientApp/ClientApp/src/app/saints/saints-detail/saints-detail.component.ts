import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router'; 
import { Saints } from '../../modelos/saints';
import { SaintsService } from '../../servicios/saints.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-saints-detail',
  templateUrl: './saints-detail.component.html',
  styleUrls: ['./saints-detail.component.css']
})
export class SaintsDetailComponent implements OnInit {
  caballero: Saints;
  caballeroId: number;
  notfound: string;
  notfoundState: boolean=false;
  gone: string;
  eliminado: string;
  show:boolean=false;
  formCaballero: FormGroup;
  caballeroFiltrado: Saints;
  backendMsg: string;
  backendStatus: number;

  constructor(private activateRoute:ActivatedRoute,
              private router:Router,
              private SaintsSrv:SaintsService,
              private fb:FormBuilder) { }

  ngOnInit() {
    //let id = parseInt(this.activateRoute.snapshot.paramMap.get('id'));
    if(this.gone===undefined){
      this.activateRoute.params.subscribe(
        params => {
          this.caballeroId = params['id']
          //let caballeroFiltrado=this.SaintsSrv.Buscar(this.caballeroId)
          //let caballeroFiltrado=[]
          this.SaintsSrv.Buscar(this.caballeroId)
            .subscribe(
              resultado=>(this.caballeroFiltrado=resultado,console.log(resultado)),
              error => (console.log(error.status),this.backendStatus=error.status,this.noEncontrado()),
              ()=> (console.log("Caballero encontrado"),
                    this.caballero=this.caballeroFiltrado,
                    this.renderForm())
            );
          }
      );
    }else{
      this.gone="¡It's Gone!"
      this.eliminado="¡Caballero Eliminado Correctamente!"
      this.caballero = undefined
    }

    
    //console.log("test"+this.caballero)
    // this.formCaballero=this.fb.group({
    //   id:[this.caballero.id, [Validators.required]],
    //   name:[this.caballero.name, [Validators.required]],
    //   type:[this.caballero.type, [Validators.required]],
    //   constellation:[this.caballero.constellation, [Validators.required]],
    //   saga: [this.caballero.saga, [Validators.required]],
    //   armor: [this.caballero.saga, [Validators.required]],
    //   thumbnail:[this.caballero.thumbnail, [Validators.required]]
    // })
    
  }
  renderForm(){
    this.caballero=this.caballeroFiltrado
    console.log(this.caballero.id)
    if(this.caballeroFiltrado){
      console.log("CaballeroOk")
    }
    this.formCaballero=this.fb.group({
      id:[this.caballero.id, [Validators.required]],
      name:[this.caballero.name, [Validators.required]],
      type:[this.caballero.type, [Validators.required]],
      constellation:[this.caballero.constellation, [Validators.required]],
      saga: [this.caballero.saga, [Validators.required]],
      armor: [this.caballero.saga, [Validators.required]],
      thumbnail:[this.caballero.thumbnail, [Validators.required]]
    })
  }
  BorrarDetail(id:number){
    this.SaintsSrv.Eliminar(id)
      .subscribe(
      resultado=>(console.log(resultado)),
      error => console.log(error),
      ()=> (this.gone="¡It's Gone!",
            this.ngOnInit())
    );
 }
 Show(){
   if(this.show){
     this.show=false
   }else{
     this.show=true
   }
 }
 EditarCaballero(){
  // let caballero:Saints=Object.assign({},this.formCaballero.value);
  // this.SaintsSrv.Editar(caballero);
  // //alert(`El caballero ${caballero.name} fue agregado con exito!`);
  // //this.ngOnInit();
  // alert(`Caballero ${caballero.name} ¡modificado con exito!`)
  // this.show=false
  // this.ngOnInit();

  let caballero:Saints=Object.assign({},this.formCaballero.value);
  this.SaintsSrv.Editar(caballero)
    .subscribe(
      resultado=>(console.log(resultado), alert(`Caballero ${caballero.name} ¡modificado con exito!`)),
      error => (console.log(error),alert(`Error Code: 0x80070006-9999103 (se cayó el backend)`)),
      ()=> (this.ngOnInit())
    );
  //alert(`El caballero ${caballero.name} fue agregado con exito!`);
  //this.ngOnInit();
  // alert(`Caballero ${caballero.name} ¡modificado con exito!`)
  // this.show=false
  // this.ngOnInit();
  

}
test(){
  this.notfound=`No se encontraron detalles con el ID ${this.caballeroId}`
  console.log(this.notfound)
  console.log(this.caballero)
  console.log(this.backendStatus)
}
noEncontrado(){
  if(this.backendStatus===0){
    this.backendMsg=`Error Code: 0x80070006-9999103 (se cayó el backend)`
  }else if(this.backendStatus===404){
    this.notfound=`No se encontraron detalles con el ID ${this.caballeroId}`
  }
}

}
