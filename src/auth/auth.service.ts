import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { Users } from '../users/interfaces/users.interface'

@Injectable()
export class AuthService {
 private readonly users = [
  {
    userId: 1,
    username: 'john',
    password: 'changeme',
  },
  {
    userId: 2,
    username: 'jane',
    password: 'secret',
  },
];
constructor(private readonly jwtService: JwtService, private readonly usersService: UsersService) {}

async registerUser(user: Users) {
 let { username } = user

 let userNameExists = await this.usersService.findUserWhere({
   $or: [
     { username: username, deleted: true },
     { username: username, deleted: false },
   ],
 });

 if(userNameExists) {
  throw new ConflictException("username already exists")
 }

 //save the users
 return this.usersService.saveUser(user)
 
}

async validateUser(username: string, password: string): Promise<any> {
 const user = this.users.find(user => user.username === username && user.password === password)

 if(user) {
  const {password, ...result} = user

  return result
 }

 return null
}

async login(user: any) {
 let payload = {username: user.username, user_id: user.userId}

 return {
   access_token: this.jwtService.sign(payload),
 };
}

async getUserProfile(user: any) {
 const userExists = this.users.find(u => u.userId === user.user_id)

 return userExists
}

}
