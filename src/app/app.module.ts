import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RootStoreModule } from './@ngrx/root-store.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveComponentModule } from '@ngrx/component';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ErrorComponent } from './components/error/error.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { TreeItemComponent } from './tree-item/tree-item.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    ErrorComponent,
    DataTableComponent,
    TreeItemComponent
  ],
  imports: [
    BrowserModule,
    RootStoreModule,
    ReactiveComponentModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
