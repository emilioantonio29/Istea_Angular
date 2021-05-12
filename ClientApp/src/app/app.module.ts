import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { SaintsComponent } from './saints/saints/saints.component';
import { SaintsDetailComponent } from './saints/saints-detail/saints-detail.component';
import { SaintsAltaComponent } from './saints/saints-alta/saints-alta.component';
import { SaintsSearchComponent } from './saints/saints-search/saints-search.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    SaintsComponent,
    SaintsDetailComponent,
    SaintsAltaComponent,
    SaintsSearchComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'caballeros', component: SaintsComponent },
      { path: 'caballeros/:id', component: SaintsDetailComponent },
      { path: 'caballeros-crear', component: SaintsAltaComponent },
      { path: 'caballeros-busqueda', component: SaintsSearchComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
