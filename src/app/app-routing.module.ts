import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Molba1Component } from './molba1/molba1.component';

const routes: Routes = [
  {
    path: 'molba1',
    component: Molba1Component
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
