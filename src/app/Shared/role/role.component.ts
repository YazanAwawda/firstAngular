import { Component, OnInit } from '@angular/core';
import { GetRole } from '../../Models/role.model';
import { RoleService } from '../../Service/RoleService/role.service';

@Component({
  selector: 'app-role',
  standalone: true,
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent implements OnInit  {

  roles : GetRole [] = [] ;

  constructor(private RoleService : RoleService){

  }

  ngOnInit(): void {
   this.RoleService
  }

}
