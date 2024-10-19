import {Pipe , PipeTransform} from "@angular/core";
import *  as EnumType from "../Enum/enum.model";

@Pipe({name : 'TaskStatus'})
export class TaskStatusPipe implements  PipeTransform {
    transform(value : EnumType.TaskStatus) {
        switch (value) {
          case EnumType.TaskStatus.Assigned : return 'Assigned';
          case EnumType.TaskStatus.Closed : return 'Closed' ;
          case EnumType.TaskStatus.Started : return 'Started' ;
          case EnumType.TaskStatus.Resolved : return 'Resolved';
          case EnumType.TaskStatus.InProgress : return  'InProgress';
          default : return 'No transformation created for ${value} ' ;
        }
    }
}
