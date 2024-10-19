import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { RegisterUser } from '../../Models/user.model';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GetRole } from '../../Models/role.model';
import { UserService } from '../../Service/UserService/user.service';
import { RoleService } from '../../Service/RoleService/role.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ RouterLink,CommonModule , HttpClientModule  , FormsModule , ReactiveFormsModule  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers : [RoleService , UserService , ToastrService ],
  schemas : [   CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA]
})
export class RegisterComponent  implements  OnInit {



 FormReg !: FormGroup ;

 Roles !: GetRole[] ;


 roleId !: number;


 constructor(private Form : FormBuilder ,
             private router : Router ,
             private UserService : UserService ,
             private RoleService : RoleService ,
             private ToastrService:ToastrService
 ){}


ngOnInit(): void {

this.FormReg = this.Form.group({
  email: new FormControl(' ' , [Validators.required]),
  username: new FormControl(' ' , [Validators.required]),
  passwordHash: new FormControl(' ' , [Validators.required]),
  roleId: new FormControl(' ' , [Validators.required])
})
this.GetRoles();
}




GetRoles(){
 this.RoleService.GetAllRoles().subscribe((res : any) => {
  this.Roles = res ;
  if (this.Roles.length > 0) {
    this.roleId = this.Roles[0].id;  // Set default selection (first role)
    this.FormReg.patchValue({ roleId: this.roleId });  // Patch form with default roleId
    console.log(this.roleId);
  }
  console.log(res);
 })
}



  // When user changes the role selection
  onRoleChange(event: any) {
    this.roleId = event.target.value;  // Capture the selected role's ID
    this.FormReg.patchValue({ roleId: this.roleId });  // Update form control
    console.log('Selected role ID:', this.roleId);  // Debugging log
  }

onSubmit(){

  let User : RegisterUser = {

   email : this.FormReg.value.email ,
   username : this.FormReg.value.username ,
   passwordHash : this.FormReg.value.passwordHash ,
   roleId :  this.FormReg.value.roleId
  }

  User.roleId = this.roleId;

  console.log(  User.roleId );

  this.UserService.RegisterUser(User).subscribe((res)=>{
    console.log(res);

  }

//   ,
//   error =>{
//     this.ToastrService.error("Created Failure, Please fill required data.");

// }

);
this.ToastrService.success("User Created Successfully. ");
this.router.navigate(['/login'])

}

}
