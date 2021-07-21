import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router'; 
import { Saints } from '../../modelos/saints';
import { SaintsService } from '../../servicios/saints.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-saints-search',
  templateUrl: './saints-search.component.html',
  styleUrls: ['./saints-search.component.css']
})
export class SaintsSearchComponent implements OnInit {
  formBusqueda: FormGroup;
  ListadoCaballeros: Saints[];
  ListadoCaballeros2;
  caballerosFiltados;
  public campobuscado:string;
  notfound: boolean=false

  constructor(private activateRoute:ActivatedRoute,
    private router:Router,
    private SaintsSrv:SaintsService,
    private fb:FormBuilder) { }

  ngOnInit() {
    console.log("render")
    this.caballerosFiltados=[]

  }
  ObservableCaballerosLista(){
    let a = []
    this.SaintsSrv.CaballerosLista()
      .subscribe(
        resultado=>(this.ListadoCaballeros=resultado),
        error => (console.log(error),alert(`Error Code: 0x80070006-9999103 (se cayó el backend)`)),
        ()=> (console.log("Lista de Caballeros Entregada"),
              this.filtrado())
      );
  }
  BuscarCaballero(campobuscado:string){
    console.log(campobuscado)
    //let type:string=Object.assign({},this.formBusqueda.value);
    //console.log(type)
    //this.SaintsSrv.BuscarType(type);
    //console.log(this.campobuscado)
    //this.caballerosFiltados=this.SaintsSrv.BuscarType(this.campobuscado);
    //this.caballerosFiltados = this.ObservableCaballerosLista();
    //this.caballerosFiltados=this.ListadoCaballeros2;
    /*console.log(this.ListadoCaballeros2)
    if(this.caballerosFiltados.length<1){
      this.notfound=true
    }else{
      this.notfound=false
    }*/
   this.ngOnInit()
   //this.ObservableCaballerosLista();
   this.nuevaBusqueda(campobuscado)
  //  this.caballerosFiltados=this.ListadoCaballeros;
  //  if(this.caballerosFiltados.length<1){
  //   this.notfound=true
  //   }else{
  //     this.notfound=false
  //   }
  }
  nuevaBusqueda(campobuscado:string){
    this.SaintsSrv.BuscarType2(campobuscado)
    .subscribe(
      resultado=>(this.caballerosFiltados=resultado),
      error => (console.log(error),alert(`Error Code: 0x80070006-9999103 (se cayó el backend)`)),
      ()=> (console.log("Lista de Caballeros Entregada"),
            this.filtrado())
    );
  }

  filtrado(){
    //this.caballerosFiltados=this.ListadoCaballeros;
    // for(let i = 0; i < this.ListadoCaballeros.length; i++) {
    //   let individual = this.ListadoCaballeros[i];
    //   if(individual.type === this.campobuscado){
    //     this.caballerosFiltados.push(individual)
    //   }
    // } 
    //console.log(caballerosFiltado)
    if(this.caballerosFiltados.length<1){
    this.notfound=true
    }else{
      this.notfound=false
    }
    return this.caballerosFiltados;
  }
}
