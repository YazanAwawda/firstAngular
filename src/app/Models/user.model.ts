export interface GetUser {
  id: number,
  username: string,
  email: string,
  passwordHash: string,
  roleId: number,
  role: null,
  tasks: null

}

export interface GetUserByID{
   id: number,
   username: string,
   email: string,
   passwordHash: string,
   roleId: number,
   role: null,
   tasks: null
}


export interface RegisterUser{
  email: string,
  username: string,
  passwordHash: string,
  roleId: number
}

export interface LoginUser{
    username: string,
    passwordHash : string
}

