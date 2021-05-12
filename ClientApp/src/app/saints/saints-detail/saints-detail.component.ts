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
  gone: string;
  eliminado: string;
  show:boolean=false;
  formCaballero: FormGroup;

  constructor(private activateRoute:ActivatedRoute,
              private router:Router,
              private SaintsSrv:SaintsService,
              private fb:FormBuilder) { }

  ngOnInit() {
    //let id = parseInt(this.activateRoute.snapshot.paramMap.get('id'));
    this.activateRoute.params.subscribe(
      params => {
        this.caballeroId = params['id']
        let caballeroFiltrado=this.SaintsSrv.Buscar(this.caballeroId)
        this.caballero=caballeroFiltrado
        if(this.gone){
          this.gone="¡It's Gone!"
          return this.eliminado="¡Caballero Eliminado Correctamente!"
        }
        else if(caballeroFiltrado.id === -1){
          this.notfound=`No se encontraron detalles con el ID ${this.caballeroId}`
        }
      }
    );

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
    this.SaintsSrv.Eliminar(id);
    this.gone="¡It's Gone!"
    this.ngOnInit();
 }
 Show(){
   if(this.show){
     this.show=false
   }else{
     this.show=true
   }
 }
 EditarCaballero(){
  let caballero:Saints=Object.assign({},this.formCaballero.value);
  this.SaintsSrv.Editar(caballero);
  //alert(`El caballero ${caballero.name} fue agregado con exito!`);
  //this.ngOnInit();
  alert(`Caballero ${caballero.name} ¡modificado con exito!`)
  this.show=false
  this.ngOnInit();
}

}
