import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FormPage } from './form.page';
import { HttpClientModule } from '@angular/common/http';
import {SignaturePadModule} from 'angular2-signaturepad';
import { IonicStorageModule } from '@ionic/storage';

const routes: Routes = [
  {
    path: '',
    component: FormPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        IonicModule,
        RouterModule.forChild(routes),
        SignaturePadModule,
        IonicStorageModule.forRoot()
    ],
    providers: [
        {provide: String},
        {provide: Boolean}
    ],
  declarations: [FormPage]
})
export class FormPageModule {}
