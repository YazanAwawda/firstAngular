import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, of, ReplaySubject, throwError} from "rxjs";
import { GetTask, PostTask, ReAssigneeEmployee } from "../../Models/task.model";

@Injectable({
  providedIn : 'root'
})

export class TaskService {

  private taksUsrl : string = "https://localhost:7275/api/Tasks"

  //  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBZG1pbjEiLCJlbWFpbCI6IkFkbWluMUBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiZXhwIjoxNzI5MjU2MjkyLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjQ0MzA2IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0NDMwNiJ9.zSaoJJTKopl0AZEq37psvq9vLpi0bXW1ONh-AJOm5f8"; // Retrieve the token from local storage
  token = localStorage.getItem('token')
  // Set the headers including the Authorization token
   headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,
    'Content-Type': 'application/json' // Set content type if needed
  });
  constructor(private  http : HttpClient) {
  }



   GetAllTasks() : Observable<GetTask[]> {
   return this.http.get<GetTask[]>(`${this.taksUsrl}`);
   }


   GetTaskById(id:number) : Observable<GetTask> {
    return this.http.get<GetTask>(`${this.taksUsrl}/${id}`);
    }

   GetTasksByUserId(id : number) : Observable<GetTask> {
    return this.http.get<GetTask>(`https://localhost:7275/api/Tasks/GetTasksByUserID/${id}?userId=${id}`);
  }

  CreateTask(task : PostTask) : Observable<PostTask>{
   return this.http.post<PostTask>(this.taksUsrl, task);
  }

  ReAssigneeEmployee(reassigne : ReAssigneeEmployee) : Observable<ReAssigneeEmployee>{
   return this.http.patch<ReAssigneeEmployee>("https://localhost:7275/api/Tasks/assign" , reassigne , { headers  : this.headers})
  }

  CloseTask(id:any) : Observable<any>{
  return this.http.patch<any>("https://localhost:7275/api/Tasks/close",id , { headers  : this.headers}).pipe(
    // Handle the response here if needed
    catchError(this.handleError) // Catch and handle errors
  );
  }

  StartTask(id:number):Observable<any>{
    return this.http.patch<any>("https://localhost:7275/api/Tasks/start",id);
    }

  ResolveTask(id:number):Observable<any>{
      return this.http.patch<any>("https://localhost:7275/api/Tasks/resolve",id);
  }

  InProgressTask(id:number):Observable<any>{
    return this.http.patch<any>("https://localhost:7275/api/Tasks/inprogress",id);
}


 // Error handling function
 private handleError(error: HttpErrorResponse) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Client-side error
    errorMessage = `Error: ${error.error.message}`;
  } else {
    // Server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    if (error.status === 400) {
      errorMessage += '\nValidation Error: ' + JSON.stringify(error.error);
    }
  }
  return throwError(() => new Error(errorMessage));
}

}

