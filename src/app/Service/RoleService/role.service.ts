import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GetRole } from "../../Models/role.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn : 'root'
})

export class RoleService {

  private roleUrl : string = "https://localhost:7275/api/Roles"

  constructor(private  http : HttpClient) {
  }

   GetAllRoles() : Observable<GetRole[]> {
   return this.http.get<GetRole[]>(`${this.roleUrl}`);
   }

   GetRoleById(id:number) : Observable<GetRole>{
    return this.http.get<GetRole>(`${this.roleUrl}/${id}`)
   }

  }
