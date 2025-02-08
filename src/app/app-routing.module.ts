 import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SuccessComponent } from './success/success.component';
import { CancelComponent } from './cancel/cancel.component';

const routes: Routes = [
{path:'',redirectTo:'/home',pathMatch:'full'},
{path:'home',component:HomeComponent},
{path:'success',component:SuccessComponent},
{path:'cancel',component:CancelComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
