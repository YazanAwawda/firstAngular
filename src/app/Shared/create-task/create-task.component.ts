import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../Service/TaskService/task.service';
import { PostTask } from '../../Models/task.model';
import { UserService } from '../../Service/UserService/user.service';
import { GetUser } from '../../Models/user.model';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [ RouterLink,CommonModule , HttpClientModule , MaterialModule  , FormsModule , ReactiveFormsModule   ],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css' ,
  providers : [TaskService , UserService  ],
  schemas : [   CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA]
})
export class CreateTaskComponent implements OnInit {

 TaskForm !: FormGroup ;
 Users : GetUser [] = [] ;
 userId !: number ;
  constructor(private fb : FormBuilder ,
      private TaskService : TaskService
    , private UserService : UserService ,
      private ToastrService :ToastrService ,
      public dialogRef: MatDialogRef<CreateTaskComponent>){

  }

  ngOnInit(): void {
  this.TaskForm = this.fb.group({
    title : new FormControl('', [Validators.required]),
    description : new FormControl('', [Validators.required]),
    userId : new FormControl('', [Validators.required]),
  })
  this.GetAllEmployees();
  }


  GetAllEmployees(){
   this.UserService.GetAllUsers().subscribe(res => {
    this.Users = res ;
    this.Users = res.filter(user => user.roleId === 2);
    if (this.Users.length > 0) {
      this.userId = this.Users[0].id;  // Set default selection (first user)
      this.TaskForm.patchValue({ userId: this.userId });  // Patch form with default userId
      console.log(this.userId);
    }
    console.log(res);
   })
  }


   onUserChange(event: any) {
    this.userId = event.target.value;
    this.TaskForm.patchValue({ userId: this.userId });
    console.log('Selected user ID:', this.userId);
  }



  onCreateTask(){

    let Task:PostTask ={
      title : this.TaskForm.value.title ,
      description : this.TaskForm.value.description,
      userId : this.TaskForm.value.userId
    }

    Task.userId = this.userId;
    console.log(Task.userId);

    this.TaskService.CreateTask(Task).subscribe((res) => {
      console.log(res);
      this.ToastrService.success("Task Created Successfully. ");
      this.closeDialog();
        window.location.reload()


    })

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
