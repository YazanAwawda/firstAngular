import { Routes } from '@angular/router';
import { TaskComponent } from './Shared/task/task.component';
import { UserComponent } from './Shared/user/user.component';
import { RegisterComponent } from './Shared/register/register.component';
import { LoginComponent } from './Shared/login/login.component';
import { UserPageComponent } from './Shared/user-page/user-page.component';
import { CreateTaskComponent } from './Shared/create-task/create-task.component';
import { TaskDetailsComponent } from './Shared/task-details/task-details.component';

export const routes: Routes = [
  {

    path:'task-list' ,
    component:  TaskComponent,
  } ,
   {
    path : 'create-task' ,
    component : CreateTaskComponent
   },
  {

    path:'users',
    component: UserComponent
  } ,
  {
    path:'register',
    component : RegisterComponent
  },
  {
    path:'login',
    component : LoginComponent
  },
  // The path: '' route redirects to the login page when no other path is specified.
  {
    path: '',
    redirectTo: 'login', // Redirect the empty path to the login page
    pathMatch: 'full'
  }
  ,
  {
    path:'user-page/:username' ,
    component: UserPageComponent
  } , {
    path : 'task-details/:id' ,
    component:TaskDetailsComponent
  }
];
