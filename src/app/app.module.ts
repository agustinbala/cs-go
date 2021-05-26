import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatchesComponent } from './features/matches/matches.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { ItemComponent } from './features/matches/item/item.component';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { ReplacePipe } from './pipe/replace.pipe';
import { StatsComponent } from './features/matches/stats/stats.component';
import {MatListModule} from '@angular/material/list';





@NgModule({
  declarations: [
    AppComponent,
    MatchesComponent,
    ItemComponent,
    ReplacePipe,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    MatToolbarModule,
    MatGridListModule, 
    MatCardModule, 
    MatButtonModule,
    MatIconModule,
    HttpClientModule, 
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
