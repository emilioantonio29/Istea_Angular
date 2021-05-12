import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router'; 
import { Saints } from '../../modelos/saints';
import { SaintsService } from '../../servicios/saints.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-saints-alta',
  templateUrl: './saints-alta.component.html',
  styleUrls: ['./saints-alta.component.css']
})
export class SaintsAltaComponent implements OnInit {
  formCaballero: FormGroup;
  newCaballero:boolean=false;
  constructor(private activateRoute:ActivatedRoute,
              private router:Router,
              private SaintsSrv:SaintsService,
              private fb:FormBuilder) { }

  ngOnInit() {
    this.formCaballero=this.fb.group({
      name:['', [Validators.required]],
      type:['', [Validators.required]],
      constellation:['', [Validators.required]],
      saga: ['', [Validators.required]],
      armor: [[''], [Validators.required]],
      thumbnail:['', [Validators.required]]
    })
  }
  GuardarCaballero(){
    let caballero:Saints=Object.assign({},this.formCaballero.value);
    this.SaintsSrv.Crear(caballero);
    alert(`El caballero ${caballero.name} fue agregado con exito!`);
    this.ngOnInit();
  }
}
