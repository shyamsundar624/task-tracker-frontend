import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';
import CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
private baseUrl='http://localhost:9090/v1/api';

private static ENCRYPTION_KEY="my-encryption-key";
authStatusChanged=new EventEmitter<void>();

  constructor(private http:HttpClient) { }

// Security related code Started
  encryptAndSaveToStorage(key:string,value:string):void{
    const encryptedValue=CryptoJS.AES.encrypt(value,TaskService.ENCRYPTION_KEY).toString();
  localStorage.setItem(key,encryptedValue);
  }

private getFromStorageAndDecrypt(key:string):any{
  try {
    const encryptedValue=localStorage.getItem(key);
    if(!encryptedValue){
      return null;
    }else{
      return CryptoJS.AES.decrypt(encryptedValue,TaskService.ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
    }
  } catch (error) {
    return null;
  }
}

private clearAuth(){
  localStorage.removeItem("token");
  localStorage.removeItem("role");
}

private getHeader():HttpHeaders{
  const token=this.getFromStorageAndDecrypt("token");
  return new HttpHeaders({
    Authorization:`Bearer ${token}`
  })
}

// Security related code Ended

//Auth User API Methods Started
registerUser(body:any):Observable<any>{
  return this.http.post(`${this.baseUrl}/auth/register`,body);
}
loginUser(body:any):Observable<any>{
  return this.http.post(`${this.baseUrl}/auth/login`,body);
}

getLoggedInUserInfo():Observable<any>{
  return this.http.get(`${this.baseUrl}/users/current`,{
    headers:this.getHeader(),
  })
}
//Auth User API Methods Ended

//Authentication Checker Started
logout():void{
  this.clearAuth();
}

isAuthenticated():boolean{
  const token=this.getFromStorageAndDecrypt("token")
  return !!token;
}
isAdmin():boolean{
  const role=this.getFromStorageAndDecrypt("role")
  console.log("******************"+role==="ADMIN")
  return role==="ADMIN";
}
//Authentication Checker Ended

  getAllTasks():Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/tasks/all`,{
      headers:this.getHeader(),
    });
  }

  getByStatus(status:string):Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/tasks/status/${status}`,
      {headers:this.getHeader()}
    );
  }

  creteTask(task:Task):Observable<Task>{
    return this.http.post<Task>(`${this.baseUrl}/tasks/create`,task,
      {headers:this.getHeader()}
    );
  }

  updateTask(taskId:number,task:Task):Observable<Task>{
    return this.http.put<Task>(`${this.baseUrl}/tasks/update/${taskId}`,task,
      {headers:this.getHeader()}
    )
  }

  deleteTask(taskId:number):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/tasks/delete`,
      {headers:this.getHeader()}
    )
  }

  getAllUsersName():Observable<any>{
    return this.http.get(`${this.baseUrl}/users/allusersname`,{
      headers:this.getHeader()
    })
  }
}
