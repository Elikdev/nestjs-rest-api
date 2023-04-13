import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { Users } from '../users/interfaces/users.interface'
import * as bcrypt from "bcrypt"
import { registerUser } from './Dto/registerUser.dto';

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

async hashPassword(password: string) {
 return bcrypt.hashSync(password, 10)
}

async comparePassword(hashedPassword: string, password: string){
 return bcrypt.compareSync(password, hashedPassword)
} 


async registerUser(user: any) {
 let { username, password } = user

 let userNameExists = await this.usersService.findUserWhere({
   $or: [
     { username: username, deleted: true },
     { username: username, deleted: false },
   ],
 });

 if(userNameExists) {
  throw new ConflictException("username already exists")
 }

 user.password = await this.hashPassword(password)

 //save the users
 let newUser = await this.usersService.saveUser(user)

 let stringifiedUser = JSON.stringify(newUser)

 let parsedUser = JSON.parse(stringifiedUser)

 delete parsedUser?.password
 delete parsedUser?.deleted

 return parsedUser
}

async validateUser(username: string, password: string): Promise<any> {
 const user = await this.usersService.findUserWhere({username})

 if(user) {
  //check if password match
  let isPasswordValid = await this.comparePassword(user.password, password)

  if(!isPasswordValid){
   throw new BadRequestException("incorrect username/password")
  }

  return user
 }

 return null
}

async login(user: any) {
 let payload = { username: user.username, user_id: user._id }

let stringifiedUser = JSON.stringify(user)

let parsedUser = JSON.parse(stringifiedUser)

 let { password, deleted,  ...result} = parsedUser

 return {
   user: result,
   access_token: this.jwtService.sign(payload),
 };
}

async getUserProfile(user: any) {
 const userExists = this.usersService.findUserById(user.user_id)

 if(!userExists) {
  throw new NotFoundException("Account does not exist")
 }

 return userExists
}

}
