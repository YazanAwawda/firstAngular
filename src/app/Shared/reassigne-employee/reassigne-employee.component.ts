import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject, Input, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { PostTask, ReAssigneeEmployee } from '../../Models/task.model';
import { UserService } from '../../Service/UserService/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GetUser } from '../../Models/user.model';
import { TaskService } from '../../Service/TaskService/task.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from '../create-task/create-task.component';

@Component({
  selector: 'app-reassigne-employee',
  standalone: true,
  imports: [CommonModule , HttpClientModule ,  MaterialModule  , FormsModule , ReactiveFormsModule ],
  templateUrl: './reassigne-employee.component.html',
  styleUrl: './reassigne-employee.component.css',
  schemas : [   CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA] ,
    providers :[UserService ,TaskService ,ToastrService]
})
export class ReassigneEmployeeComponent implements OnInit {


  reassigne !: ReAssigneeEmployee ;
  Users : GetUser [] = [] ;
  @Input() taskId !: number;
  userId !:number;
  EmpForm !: FormGroup ;


  constructor(private UserService : UserService,
    private fb : FormBuilder ,
    private  dialogRef: MatDialogRef<ReassigneEmployeeComponent>,
    private TaskService : TaskService ,
   private ToastrService : ToastrService ,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.taskId = data.taskId ;
    }

  ngOnInit(): void {

    this.taskId = this.data.taskId;

    this.EmpForm = this.fb.group({
      taskId :  new FormControl('', [Validators.required]) ,
      userId :  new FormControl('', [Validators.required]) ,
    })
    this.GetAllEmployees();
  }



 GetAllEmployees(){
  this.UserService.GetAllUsers().subscribe((res) => {
    this.Users = res.filter(user => user.roleId === 2);
    if (this.Users.length > 0) {
      this.userId = this.Users[0].id;  // Set default selection (first user)
      this.EmpForm.patchValue({ userId: this.userId });  // Patch form with default userId
      console.log(this.userId);
    }
  })
 }

  onUserChange(event: any) {
    this.userId = event.target.value;
    this.EmpForm.patchValue({ userId: this.userId });
    console.log('Selected user ID:', this.userId);
  }

  onReAssigneEmployee(){

    let emp : ReAssigneeEmployee ={
      taskId : this.EmpForm.value.taskId,
      userId : this.EmpForm.value.userId
    }

    emp.taskId = this.taskId ;
    emp.userId = Number(this.userId) ;

    console.log(emp.taskId , emp.userId )
    this.TaskService.ReAssigneeEmployee(emp).subscribe((res) => {
      console.log(res);
    })
    this.ToastrService.success("Task Assigned Successfully. ");
    this.close();

  }


 close() {
  this.dialogRef.close();
}

}
