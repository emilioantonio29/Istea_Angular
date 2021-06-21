import { Component, OnInit } from '@angular/core';
import { Saints } from '../../modelos/saints';
import { SaintsService } from '../../servicios/saints.service';

@Component({
  selector: 'app-saints',
  templateUrl: './saints.component.html',
  styleUrls: ['./saints.component.css']
})
export class SaintsComponent implements OnInit {
  ListadoCaballeros:Saints[];
  backendMsg: string;
  backendStatus: number;
  bienvenida: string;
  caballerosNotFound: boolean;

  constructor(private SaintsSrv:SaintsService) { }

  //suscripcion al metodo del servicio observable
  ngOnInit() {
    //this.ListadoCaballeros=this.SaintsSrv.CaballerosLista();
    this.ObservableCaballerosLista();
    
    
  }
  //suscripcion al metodo del servicio observable; tenemos 3 estados, 
  //1.- NEXT es el que nos devuelve el resultado: mostrar resultado, 
  //2.- ERROR:  el error y uno de finalizacion
  //3.- Finalizar (Complete): Mostramos un  mensaje de proceso terminado
  ObservableCaballerosLista(){
    this.ListadoCaballeros = []
    this.SaintsSrv.CaballerosLista()
      .subscribe(
        resultado=>(this.ListadoCaballeros=resultado,this.bienvenida=`Haciendo Click sobre el ID puede ir a verificar el detalle...`,this.caballerosNotFound=true),
        error => (console.log(error),this.backendStatus=error.status,this.noEncontrado()),
        ()=> console.log("Lista de Caballeros Entregada")
      );
  }
  noEncontrado(){
    if(this.backendStatus===0){
      this.backendMsg=`Error Code: 0x80070006-9999103 (se cayó el backend)`
      console.log(this.backendMsg)
    }else if(this.backendStatus===404){
      console.log("No hay caballeros en la Lista")
    }
  }

}
