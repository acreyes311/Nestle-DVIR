import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'new-trip', loadChildren: './new-trip/new-trip.module#NewTripPageModule' },
  { path: 'form/:prepost', loadChildren: './form/form.module#FormPageModule' },
  { path: 'form/:prepost/:section', loadChildren: './form/form.module#FormPageModule' },
  { path: 'form/:prepost/:section/:subsection', loadChildren: './form/form.module#FormPageModule' },  { path: 'logout', loadChildren: './logout/logout.module#LogoutPageModule' },
  { path: 'previous-inspection', loadChildren: './previous-inspection/previous-inspection.module#PreviousInspectionPageModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
