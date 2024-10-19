import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleService } from '../../Service/RoleService/role.service';
import { UserService } from '../../Service/UserService/user.service';
import { ToastrService } from 'ngx-toastr';
import { LoginUser } from '../../Models/user.model';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from '../../Service/TaskService/task.service';
import { GetTask } from '../../Models/task.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:  [ RouterLink,CommonModule , HttpClientModule  , FormsModule , ReactiveFormsModule   ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers : [UserService , ToastrService  ]
})
export class LoginComponent implements OnInit {

  user !: LoginUser ;
  userFormGroup !: FormGroup<any>;
  userName !: string ;


  constructor(
    private UserService : UserService,
    private ToastrService : ToastrService,
    private router : Router ,
    private fb : FormBuilder
    ){}


  ngOnInit(): void {

   this.userFormGroup = this.fb.group({
    username: ['  '],
    passwordHash : ['  ']
   })

  }

  get username(){return this.userFormGroup.get('username');}
  get passwordHash(){return this.userFormGroup.get('passwordHash')}

  onLogin() {

     const loginUser : LoginUser = {
      username : this.username?.value ,
      passwordHash : this.passwordHash?.value
     }

      this.UserService.LoginUser(loginUser).subscribe((res) => {
        this.user = res;
        this.userName = this.user.username;
        this.ToastrService.success("Login Successfully");
        console.log(res);

           this.router?.navigate(['/user-page/', this.userName]);



     }

      ,
  error =>{
    this.ToastrService.error("Login Failed");

}

    )

  }


}
