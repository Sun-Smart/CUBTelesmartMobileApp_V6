import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeatmapPageRoutingModule } from './heatmap-routing.module';

import { HeatmapPage } from './heatmap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeatmapPageRoutingModule
  ],
  declarations: [HeatmapPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeatmapPageModule {}
