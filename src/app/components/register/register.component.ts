import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
formData:any={
  email:'',
  username:'',
  password:'',
}

message:string='';

  constructor(
    private taskService:TaskService,
    private router:Router
  ){}

  async handleSubmit(){
    if(!this.formData.email ||
      !this.formData.username ||
      !this.formData.password
    ){
      this.showMessage('All Fields are Required')
      return;
    }
    try {
      const response:any=await firstValueFrom(
this.taskService.registerUser(this.formData)
      );
      if(response.status===200){
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.log(error)
      this.showMessage('Ynable to register a user '+error)
    }
  }

  showMessage(message:string){
    this.message=message

    setTimeout(() => {
      this.message=''
    }, 4000);
  }
}
