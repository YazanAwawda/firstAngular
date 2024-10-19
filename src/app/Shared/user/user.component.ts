import { Component, OnInit } from '@angular/core';
import { GetUser } from '../../Models/user.model';
import { UserService } from '../../Service/UserService/user.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user',
  standalone: true,
  imports:[CommonModule , HttpClientModule  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  providers:[UserService]

})
export class UserComponent  implements OnInit {

   users : GetUser [] = [] ;


   constructor(private UserService:UserService){

   }


  ngOnInit(): void {
  this.UserService.GetAllUsers().subscribe((res : any) => {
    this.users = res ;
  })
  }

}
