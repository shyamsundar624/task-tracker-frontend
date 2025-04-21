import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'task-tracker-ui';

  constructor(private taskService:TaskService,
    private router:Router,
    private cdr:ChangeDetectorRef
  ){}

  isAuth():boolean{
    return this.taskService.isAuthenticated();
  }
  isAdmin(){
    return this.taskService.isAdmin();
  }

  logout(){
    this.taskService.logout();
    this.router.navigate(['/login']);
    this.cdr.detectChanges();
  }
}
