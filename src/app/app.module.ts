import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveComponentModule } from '@ngrx/component';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { TreeItemComponent } from './tree-item/tree-item.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TreeItemComponent
  ],
  imports: [
    BrowserModule,
    ReactiveComponentModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
