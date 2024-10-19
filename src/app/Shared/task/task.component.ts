import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { GetTask } from '../../Models/task.model';
import { TaskService } from '../../Service/TaskService/task.service';
import { TaskStatus } from '../../Enum/enum.model';
import { enumToString } from '../../EnumHelper/enum.helper';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TaskStatusPipe } from '../../EnumPipe/enum.pipe';
import { MaterialModule } from '../../material.module';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-task',
  standalone: true,
  imports:[CommonModule , HttpClientModule  , MaterialModule , RouterLink],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  providers:[ TaskService , TaskStatusPipe],
  schemas : [   CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA]
})
export class TaskComponent implements OnInit {

  tasks : GetTask [] = [] ;
  protected readonly TaskStatus = TaskStatus;
  protected readonly enumToString = enumToString;
  color:any ;
  constructor(private TaskService : TaskService ,public dialog: MatDialog ){

  }

  ngOnInit(): void {

   this.TaskService.GetAllTasks().subscribe((res : any) => {
    this.tasks = res ;
     console.log(res);
     for (const re of this.tasks) {
      this.onColorTaskStatus(enumToString( TaskStatus ,re.taskStatus) );
    }
  })}

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

  openDialog(): void {
    this.dialog.open(CreateTaskComponent, {
      width: '500px'
  });
  }
}
