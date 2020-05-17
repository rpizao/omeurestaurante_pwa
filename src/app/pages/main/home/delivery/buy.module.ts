import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BuyComponent } from './buy.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: ':id', component: BuyComponent }
    ])
  ],
  declarations: [BuyComponent]
})
export class BuyModule {}
