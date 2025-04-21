import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
formData:any={
  email:'',
  password:''
}
message:string='';
constructor(private taskService:TaskService,private router:Router){}

async handleSubmit(){
  if(!this.formData.email || !this.formData.password){
    this.showMessage("All Fields are Required")
    return;
  }

  try {
    const response= await firstValueFrom(
      this.taskService.loginUser(this.formData)
    )
    if(response.status===200){
      this.taskService.encryptAndSaveToStorage('token',response.token);
      this.taskService.encryptAndSaveToStorage('role',response.role);
      this.router.navigate(['/list']);
    }
  } catch (error) {
    console.log(error)
    this.showMessage("Unable to Login")
  }
}
showMessage(messgae:string){
  this.message=messgae

  setTimeout(() => {
    this.message=''
    
  }, 4000);
}
}
