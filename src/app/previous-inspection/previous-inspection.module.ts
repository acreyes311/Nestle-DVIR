import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PreviousInspectionPage } from './previous-inspection.page';

const routes: Routes = [
  {
    path: '',
    component: PreviousInspectionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PreviousInspectionPage]
})
export class PreviousInspectionPageModule {}
