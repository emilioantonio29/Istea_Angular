import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Saints } from '../modelos/saints';

@Injectable({
  providedIn: 'root'
})
export class SaintsService {
  lastID:number;
  nuevoCaballero:Saints;
  editarCaballero:Saints;
  ListadoCaballeros:Saints[]=[ 
    // {id:1000,name:"Seiya",type:"Bronce",constellation:"Pegaso",saga:"todas",armor:["Bronce","Oro","Asgard"],thumbnail:"https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/seiya3.png"},
    // {id:1001,name:"Hyoga",type:"Bronce",constellation:"Cisne",saga:"todas",armor:["Bronce","Oro"],thumbnail:"https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/cisne.png"},
    // {id:1002,name:"Shiriu",type:"Bronce",constellation:"Dragon",saga:"todas",armor:["Bronce","Oro"],thumbnail:"https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/dragon.png"},
    // {id:1003,name:"Ikki",type:"Bronce",constellation:"Fenix",saga:"todas",armor:["Bronce"],thumbnail:"https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/ikki.png"},
    // {id:1004,name:"Shun",type:"Bronce",constellation:"Andromeda",saga:"todas",armor:["Bronce"],thumbnail:"https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/andromeda.png"},
    // {id:1006,name:"Milo",type:"Oro",constellation:"Escorpio",saga:"12 casas",armor:["oro"],thumbnail:"https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/milo2.jpg"},
    // {id:1007,name:"Aldebaran",type:"Oro",constellation:"Tauro",saga:"12 casas",armor:["oro"],thumbnail:"https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/aldebaran.jpg"},
    // {id:1008,name:"Aiyoria",type:"Oro",constellation:"Leo",saga:"12 casas",armor:["oro"],thumbnail:"https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/aiyoria.jpg"},
    // {id:1009,name:"Mu",type:"Oro",constellation:"Aries",saga:"12 casas",armor:["oro"],thumbnail:"https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/mu.jpg"},
    // {id:1010,name:"Camus",type:"Oro",constellation:"Acuario",saga:"12 casas",armor:["oro"],thumbnail:"https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/milo2.jpg"},
    // {id:1011,name:"Sigrfied ",type:"Asgard",constellation:"Dubhe Alfa",saga:"Asgard",armor:["Asgard"],thumbnail:"https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/sidfrid.png"},
    // {id:1012,name:"Hagen  ",type:"Asgard",constellation:"Merak Beta",saga:"Asgard",armor:["Asgard"],thumbnail:"https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/hagen.png"},

  ]
  public rutaApi: string = "http://localhost:5000/api/Caballeros"
  constructor(private http:HttpClient) { }

  CaballerosLista():Observable<Saints[]>{
    //return this.ListadoCaballeros.slice();
    return this.http.get<Saints[]>(this.rutaApi);
  }
  Buscar(saintId:number):any{
    saintId=+saintId
    /*let indice = this.ListadoCaballeros.findIndex(data=>data.id===saintId);
    if(indice === -1){
      return {id:-1,name:"not found",type:"not found",constellation:"not found",saga:"not found",armor:["not found"],thumbnail:"not found"}
    }else{  
      return this.ListadoCaballeros[indice]
    }*/
    return this.http.get<Saints>(`${this.rutaApi}/${saintId}`);
  }
  // Ya no estoy llamando a este metodo... Para el filtrado llamo a CaballerosLista en el componente y filtro la lista...
  BuscarType(tipo:string){
    let caballerosFiltado = [];
    for(let i = 0; i < this.ListadoCaballeros.length; i++) {
      let individual = this.ListadoCaballeros[i];
      if(individual.type === tipo){
        caballerosFiltado.push(individual)
      }
    } 
    console.log(caballerosFiltado)
    return caballerosFiltado
  }
  BuscarType2(tipo:string){
    return this.http.get<Saints[]>(`${this.rutaApi}/cadena?cadena=${tipo}`);
  }
  Eliminar(saintId:number):any{
    /*saintId=+saintId
    this.ListadoCaballeros.forEach((value,index)=>{
      if(value.id===saintId){
        this.ListadoCaballeros.splice(index,1)
      }
    })
    return 0;*/
    return this.http.delete<Saints>(`${this.rutaApi}/${saintId}`);
  } 
  Crear(caballero:Saints):Observable<Saints>{
    /*if(this.ListadoCaballeros.length>0){
      this.lastID = this.ListadoCaballeros.slice(-1).pop().id +1
    }else{
      this.lastID = 1000
    }*/
    this.nuevoCaballero = {
                          id: 0,
                          name: caballero.name,
                          type: caballero.type,
                          constellation: caballero.constellation,
                          saga: caballero.saga,
                          armor: caballero.armor,
                          thumbnail: caballero.thumbnail
                        }
    //this.ListadoCaballeros.push(this.nuevoCaballero)
    return this.http.post<Saints>(`${this.rutaApi}`, this.nuevoCaballero);
  }
  Editar(caballero:Saints):Observable<Saints>{
    /*let indice = this.ListadoCaballeros.findIndex(data=>data.id===caballero.id);
    this.ListadoCaballeros[indice] = {
      id: caballero.id,
      name: caballero.name,
      type: caballero.type,
      constellation: caballero.constellation,
      saga: caballero.saga,
      armor: caballero.armor,
      thumbnail: caballero.thumbnail
    }*/
    this.editarCaballero = {
      id: caballero.id,
      name: caballero.name,
      type: caballero.type,
      constellation: caballero.constellation,
      saga: caballero.saga,
      armor: caballero.armor,
      thumbnail: caballero.thumbnail
    }
    console.log(this.editarCaballero)
    //console.log(`CABALLERO MODIFICADO: ${this.ListadoCaballeros[indice].name}`)
    return this.http.put<Saints>(`${this.rutaApi}/${caballero.id}`, this.editarCaballero);
  }
}
