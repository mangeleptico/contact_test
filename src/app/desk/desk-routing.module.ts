import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from '../authentication/guards/auth-guard.guard';
import { ContactFormComponent } from './contact-form/contact-form.component';

const routes: Routes = [
  { path: 'contact', component: ContactFormComponent,
  canActivate: [AuthGuardGuard]},
  { path: '', redirectTo: 'contact', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeskRoutingModule { }
