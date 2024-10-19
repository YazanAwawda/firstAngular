import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../Service/TaskService/task.service';
import { GetTask } from '../../Models/task.model';
import { TaskStatus } from '../../Enum/enum.model';
import { enumToString } from '../../EnumHelper/enum.helper';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ReassigneEmployeeComponent } from '../reassigne-employee/reassigne-employee.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../Service/UserService/user.service';
import { RoleService } from '../../Service/RoleService/role.service';
import { GetUser } from '../../Models/user.model';
import { GetRole } from '../../Models/role.model';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [HttpClientModule ,CommonModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css' ,
  schemas : [   CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA],
    providers:[TaskService, ToastrService , RoleService , UserService]
})
export class TaskDetailsComponent implements OnInit {

 taskId !: number;
 task !: GetTask;
 isPopupOpened !: boolean;
 userId !: number ;
 roleId !: number;
 user !: GetUser ;
 role !: GetRole;

 constructor(private route : ActivatedRoute,
  private ToastrService : ToastrService ,
  private  dialog : MatDialog,
  private UserService : UserService,
  private RoleService : RoleService ,
  private TaskService : TaskService){

 }

 ngOnInit(): void {
  this.route.params.subscribe(x => this.taskId = Number(x['id']))
  this.GetTaskByID();
}

GetTaskByID(){
 this.TaskService.GetTaskById(this.taskId).subscribe((res) => {
  this.task = res;
  this.taskId = res.id;
  this.userId = this.task.userId ;
  enumToString(TaskStatus , this.task.taskStatus ) ;
  console.log(enumToString(TaskStatus , this.task.taskStatus ) )
  this.GetUserById();

 })
}

// Assigned = 0,
// InProgress = 1,
// Closed = 2 ,
// Started = 3 ,
// Resolved = 4
 CheckFoReAssignee(){ // Manager Or Employee Can ReAssigne The Task With Role === 1 || 2
  if(this.roleId === 1 || this.roleId === 2)
{
    return (enumToString(TaskStatus , this.task.taskStatus ) === "Assigned") || ((enumToString(TaskStatus , this.task.taskStatus ) === "Closed"))

}
return false ;

}

CheckInProgress(){ // Employee Make InProgress The Task With Role === 2
  if(this.roleId === 2 )
  {
  return  ((enumToString(TaskStatus , this.task.taskStatus ) === "Started"))

  }
  return false ;
 }

 CheckClosed(){ // Manager Or Admin Can Close The Task With Role === 1
  if(this.roleId === 1) {
      return ( enumToString(TaskStatus , this.task.taskStatus ) === "Resolved" )

  }
  return false;

 }

 CheckStarted(){ // Employee Can Start The Task With Role === 2

  if(this.roleId === 2) {
  return ( enumToString(TaskStatus , this.task.taskStatus ) === "Assigned" )
  }
  return false;

 }

 CheckResolved(){  // Employee Can Resolve The Task With Role === 2
  if(this.roleId === 2) {
      return  ((enumToString(TaskStatus , this.task.taskStatus ) === "InProgress"))
  }
  return false;
 }

 openDialogEmp() {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '750px';
  dialogConfig.height = "425px" ;
  dialogConfig.data = {
    taskId: this.taskId
    };

  this.isPopupOpened = true;
  const dialogRef =
    this.dialog.open(ReassigneEmployeeComponent, dialogConfig);

  dialogRef.afterClosed().subscribe(data => {
    console.log("Dialog output:", data);
    this.isPopupOpened = false;
  });
}

CloseTask(taskId:number){
this.TaskService.CloseTask(Number(taskId)).subscribe({
  next: (response) => {
    console.log('Task status updated successfully:', response);
  },
  error: (error) => {
    console.error('Error updating task status:', error.message);
  }
});
}
StartTask(taskId:number){
  this.TaskService.StartTask(Number(taskId)).subscribe({
    next: (response) => {
      console.log('Task status updated successfully:', response);
    },
    error: (error) => {
      console.error('Error updating task status:', error.message);
    }
  });
}
ResolveTask(taskId:number){
  this.TaskService.ResolveTask(Number(taskId)).subscribe({
    next: (response) => {
      console.log('Task status updated successfully:', response);
    },
    error: (error) => {
      console.error('Error updating task status:', error.message);
    }
  });
}
InProgressTask(taskId:number){
  this.TaskService.InProgressTask(Number(taskId)).subscribe({
    next: (response) => {
      console.log('Task status updated successfully:', response);
    },
    error: (error) => {
      console.error('Error updating task status:', error.message);
    }
  });
}
GetUserById(){
this.UserService.GetUserByID(this.userId).subscribe(res => {
  this.user = res;
  this.roleId = this.user.roleId;
  this.GetRoleById();
  console.log(res);
})
}

GetRoleById(){
  this.RoleService.GetRoleById(this.roleId).subscribe(res => {
    this.role = res ;
    console.log(res);
  })
}

}
