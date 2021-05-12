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
  constructor(private SaintsSrv:SaintsService) { }

  ngOnInit() {
    this.ListadoCaballeros=this.SaintsSrv.CaballerosLista();

  }

}
