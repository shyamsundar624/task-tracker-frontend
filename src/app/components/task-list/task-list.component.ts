import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit{
tasks:any[]=[];
filterStatus='';

isDisabled :boolean=false;
constructor(private taskService:TaskService){}

  ngOnInit(): void {
    this.loadTasks();
    this.isAdmin();
  }

  loadTasks() {
    if(this.filterStatus){
      this.taskService.getByStatus(this.filterStatus)
      .subscribe(data=>this.tasks=data);
    }else{
      this.taskService.getAllTasks()
      .subscribe(data=>this.tasks=data)
    }
  }

  deleteTask(id:number){
    this.taskService.deleteTask(id).subscribe(()=>this.loadTasks());
  }

  isAdmin(){
    this.isDisabled= this.taskService.isAdmin();
  }
}
