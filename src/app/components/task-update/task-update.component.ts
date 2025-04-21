import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Task } from '../../models/task';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-update',
  imports: [CommonModule,FormsModule,],
  templateUrl: './task-update.component.html',
  styleUrl: './task-update.component.css'
})
export class TaskUpdateComponent implements OnInit{
  task: Task = {
    title: '',
    description: '',
    dueDate: 'PENDING',
    status: 'MEDIUM',
    priority: '',
    remarks:'',
    id: 0
  };

  constructor(private taskService: TaskService, 
    private router: Router,
  private route:ActivatedRoute) {}
  
  ngOnInit(): void {
    const taskId=this.route.snapshot.params['id'];
    this.taskService.getAllTasks().subscribe(tasks=>{
      const t=tasks.find(t=>t.id==taskId);
      if(t)this.task=t;
    })
  }

  onSubmit() {
    this.taskService.updateTask(this.task.id, this.task).subscribe(() => {
      this.router.navigate(['/list']);
    });
  }
}
