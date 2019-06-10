import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateUserComponent } from './create-user/create-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: 'user', component: CreateUserComponent },
  { path: 'tasks', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
      //  { enableTracing: true })
     // <-- debugging purposes only
  ],
  declarations: []
})
export class AppRoutingModule { }
