import { TaskStatus } from "../Enum/enum.model";

export interface GetTask {
  id: number,
  title: string,
  description: string,
  isCompleted: boolean,
  userId: number,
  user: null,
  taskStatus: TaskStatus
}

export interface PostTask {
 id ?: number ,
 title : string ,
 description : string ,
 userId : number
}

export interface ReAssigneeEmployee{
taskId: number ,
userId : number
}
