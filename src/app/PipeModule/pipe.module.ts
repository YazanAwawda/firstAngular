import { NgModule }      from '@angular/core';
import * as EnumPipe     from '../EnumPipe/enum.pipe';


@NgModule({
  imports:        [],

  declarations:[
    EnumPipe.TaskStatusPipe
   ],

  exports:[

    EnumPipe.TaskStatusPipe
],
})

export class PipeModule {

  static forRoot() {
    return {
      ngModule: PipeModule,
      providers: [],
    };
  }
}
