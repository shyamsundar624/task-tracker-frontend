import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { Router, RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-create',
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.css',
})
export class TaskCreateComponent implements OnInit{
  usersName:any[]=[];
  task: any = {
    title: '',
    description: '',
    dueDate: '',
    status: '',
    priority: '',
    remarks:'',
    userObj:''
    
  };

  constructor(private taskService: TaskService, private router: Router) {}
  ngOnInit(): void {
   this.getUsersName();
  }
  
  getUsersName():void {
    this.taskService.getAllUsersName().subscribe((data)=>{
      this.usersName=data
    })
  }


  onSubmit() {
    this.taskService.creteTask( this.task).subscribe(() => {
      
      this.router.navigate(['/list']);
    });
  }

}
