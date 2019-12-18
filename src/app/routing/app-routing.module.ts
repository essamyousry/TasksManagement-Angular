import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksAddComponent } from '../tasks/tasks-add/tasks-add.component';
import { TasksComponent } from '../tasks/tasks.component';
import { TasksUpdateComponent } from '../tasks/tasks-update/tasks-update.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { GuardService } from '../guards/guard.service';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'tasks-list', component: TasksComponent, canActivate: [GuardService]},
  {path: 'tasks-list/add-task', component: TasksComponent, canActivate: [GuardService]},
  {path: 'tasks-list/update-task/:taskid', component: TasksComponent, canActivate: [GuardService]},
  {path: 'tasks-list/view-task/:taskid', component: TasksComponent, canActivate: [GuardService]},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
