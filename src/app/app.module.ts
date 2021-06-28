import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatchItemListComponent } from "./features/matches/match-item-list/match-item-list.component";
import { MatIconModule } from "@angular/material/icon";
import { HttpClientModule } from "@angular/common/http";
import { ReplacePipe } from "./pipe/replace.pipe";
import { MatchStatsComponent } from "./features/matches/match-stats/match-stats.component";
import { MatListModule } from "@angular/material/list";
import { MatTableModule } from "@angular/material/table";
import { ExternalAPIMatchListItemComponent } from "./features/external-api-matches/external-api-match-item-list/external-api-match-item-list.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ExternalAPIMatchListComponent } from "./features/external-api-matches/external-api-match-list/external-api-match-list.component";
import { ExternalAPIMatchesComponent } from "./features/external-api-matches/external-api-matches.component";
import { ContainerComponent } from "./features/container/container.component";
import { SummaryComponent } from "./features/summary/summary.component";
import { BetsComponent } from "./features/bets/bets.component";
import { BetsItemListComponent } from "./features/bets/bets-item-list/bets-item-list.component";
import { BetsListComponent } from "./features/bets/bets-list/bets-list.component";
import { MatchListComponent } from "./features/matches/match-list/match-list.component";
import { DatePipe } from "@angular/common";
import { AddBetDialogComponent } from "./features/matches/add-bet-dialog/add-bet-dialog.component";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material";
import { MatFormFieldModule, MatSelectModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    MatchItemListComponent,
    ExternalAPIMatchesComponent,
    ReplacePipe,
    MatchStatsComponent,
    ExternalAPIMatchListItemComponent,
    ExternalAPIMatchListComponent,
    ContainerComponent,
    SummaryComponent,
    BetsComponent,
    BetsItemListComponent,
    BetsListComponent,
    MatchListComponent,
    AddBetDialogComponent,
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
    MatListModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe],
  entryComponents: [AddBetDialogComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
