import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, of, ReplaySubject, throwError} from "rxjs";
import { GetUser, GetUserByID, LoginUser, RegisterUser } from "../../Models/user.model";

@Injectable({
  providedIn : 'root'
})

export class UserService {

  private userUrl : string = "https://localhost:7275/api/Users";
  private loginUrl : string = "https://localhost:7275/api/Auth/login";
  private registerUrl : string = "https://localhost:7275/api/Auth/register";

  constructor(private  http : HttpClient) {
  }


  token = localStorage.getItem('token'); // Retrieve the token from local storage

  // Set the headers including the Authorization token
   headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,
    'Content-Type': 'application/json' // Set content type if needed
  });


   GetAllUsers() : Observable<GetUser[]> {
   return this.http.get<GetUser[]>(`${this.userUrl}`);
   }

   GetUserByID(Id:number) : Observable<GetUserByID> {
    return this.http.get<GetUserByID>(`${this.userUrl}/${Id}`);
   }

   RegisterUser(user : RegisterUser)
   {
   return  this.http.post<RegisterUser>(this.registerUrl, user , { headers: this.headers})
   }

   LoginUser(user : LoginUser)
   {
   return this.http.post<LoginUser>(this.loginUrl,user);
   }

   GetUserByName(username:string) : Observable<GetUser>{
   return this.http.get<GetUser>(`https://localhost:7275/api/Users/GetUserByUsername/${username}`);
   }

}

