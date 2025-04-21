import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskCreateComponent } from './components/task-create/task-create.component';
import { TaskUpdateComponent } from './components/task-update/task-update.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { GuardService } from './services/guard.service';

export const routes: Routes = [

    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},

    {path:'list',component:TaskListComponent},
    {path:'create',component:TaskCreateComponent},
    {path:'update/:id',component:TaskUpdateComponent, canActivate:[GuardService], data:{requiredAdmin:true} },

    {path:'',redirectTo:'/login',pathMatch:'full'}
];
