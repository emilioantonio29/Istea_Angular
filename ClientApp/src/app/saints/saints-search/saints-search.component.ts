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
  caballerosFiltados: Saints[];
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
  BuscarCaballero(){
    //let type:string=Object.assign({},this.formBusqueda.value);
    //console.log(type)
    //this.SaintsSrv.BuscarType(type);
    console.log(this.campobuscado)
    this.caballerosFiltados=this.SaintsSrv.BuscarType(this.campobuscado);
    if(this.caballerosFiltados.length<1){
      this.notfound=true
    }else{
      this.notfound=false
    }
  }

}
