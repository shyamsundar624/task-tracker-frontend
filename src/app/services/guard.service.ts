import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{

  constructor(private taskService:TaskService,private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
  const requiredAdmi=  route.data['requiresAdmin'] || false;
  if(requiredAdmi){
    if(this.taskService.isAdmin()){
      return true;
    }else{
      this.router.navigate(['/login'],{
        queryParams:{returnUrl:state.url}
      });
      return false;
    }
  }else{
if(this.taskService.isAuthenticated()){
  return true;
}else{
  this.router.navigate(['/login'],{
    queryParams:{returnUrl:state.url}
  });
  return false;
}
  }
  }
}
