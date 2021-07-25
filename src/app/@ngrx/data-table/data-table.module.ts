import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// NgRx
import { StoreModule } from '@ngrx/store';
import * as fromReducer from './data-table.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromReducer.dataTableFeatureKey,
      fromReducer.DataTableReducer
    )
  ],
})
export class DataTableModule {}
