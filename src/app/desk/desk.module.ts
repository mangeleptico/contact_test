import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeskRoutingModule } from './desk-routing.module';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactTableComponent } from './contact-table/contact-table.component';
import { MaterialModule } from '../core/material.module';


@NgModule({
  declarations: [
    ContactFormComponent,
    ContactTableComponent
  ],
  imports: [
    CommonModule,
    DeskRoutingModule,
    MaterialModule,
  ]
})
export class DeskModule { }
