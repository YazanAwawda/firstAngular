import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../Service/UserService/user.service';
import { GetUser } from '../../Models/user.model';
import { HttpClientModule } from '@angular/common/http';
import { GetTask } from '../../Models/task.model';
import { TaskService } from '../../Service/TaskService/task.service';
import { GetRole } from '../../Models/role.model';
import { RoleService } from '../../Service/RoleService/role.service';
import { TaskStatus } from '../../Enum/enum.model';
import { enumToString } from '../../EnumHelper/enum.helper';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [HttpClientModule ,CommonModule , MaterialModule , RouterLink],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css' ,
  providers:[UserService , TaskService , RoleService] ,
  schemas : [   CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA]
})
export class UserPageComponent implements OnInit {

  username !: string ;
  User !: GetUser;
  userId !: number ;
  Tasks : GetTask [] = [];
  Role !: GetRole ;
  roleId !:  number;
  protected readonly TaskStatus = TaskStatus;
  protected readonly enumToString = enumToString;
  color:any ;

  constructor(private route : ActivatedRoute ,
             private router : Router ,
             private UserService : UserService ,
             private RoleService : RoleService ,
             private TaskService :TaskService){}




  UserDetails(username:string){
  this.UserService.GetUserByName(username).subscribe(res => {
   this.User = res;
   this.userId = this.User.id;
   this.roleId = this.User.roleId;
   if(this.roleId === 1  || this.roleId === 3)
    {
      this.router?.navigate(['/task-list']);
    }
    else {
   this.TasksDetails();
   this.GetRole();
   console.log(this.User);
    }

  })
  }

  TasksDetails() {
   this.TaskService.GetTasksByUserId(this.userId).subscribe((res: any) => {
    this.Tasks = res;
    for (const re of  this.Tasks) {
      this.onColorTaskStatus(enumToString( TaskStatus ,re.taskStatus) );
    }
    console.log(res);
    console.log(this.userId);
   })
  }

 GetRole(){
  this.RoleService.GetRoleById(this.roleId).subscribe((res) =>{
    this.Role = res;
    console.log(res);
    console.log(this.roleId);
  })
 }

  ngOnInit(): void {

    this.username = this.route.snapshot.paramMap.get('username')!;
    this.UserDetails(this.username);
   }

  onColorTaskStatus(val:string)  {

    let colorStatus : any ;

      if( val === "Started")
      {
          return colorStatus = "badge text-bg-secondary" ;
      }

      if ( val === "InProgress")
      {
          return colorStatus = "badge text-bg-warning" ;
      }
      if ( val === "Assigned")
      {
          return colorStatus = "badge text-bg-primary" ;

      }
      if (val === "Closed")
      {
          return colorStatus = "badge text-bg-danger" ;
      }
      if (val === "Resolved")
        {
            return colorStatus = "  badge text-bg-success" ;
        }

    return colorStatus as string ;

  }

}
