import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { SignupCredentialsDTO } from './dto/signup.credentials.dto';
import { AuthCredentialsDTO } from './dto/auth.credentials.dto';
import { JwtPayload } from './jwt.payload';
import { UserEntity } from './user.entity';
import * as crypto from 'crypto-js';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    //for creating jwt token
    private jwtService: JwtService,
  ) {}

  // signup
  async signup(signupCredentialsDto: SignupCredentialsDTO) {
    return this.userRepository.signup(signupCredentialsDto);
  }

  // signin
  async signin(authCredentialsDto: AuthCredentialsDTO) {
    const user = await this.userRepository.signin(authCredentialsDto);
    console.log(user);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const payload: JwtPayload = {
      email: user.email,
      id: user.id,
    };

    const token = await this.jwtService.sign(payload);
    return { token };
  }

  async updateUser(id: string, signupCredentialsDto: SignupCredentialsDTO) {
    const user = await this.userRepository.findOne(id);
    if (user) {
      user.firstname = signupCredentialsDto.firstname;
      user.lastname = signupCredentialsDto.lastname;
      user.email = signupCredentialsDto.email;
      user.password = `${crypto.MD5(signupCredentialsDto.password)}`;
      user.city = signupCredentialsDto.city;
      user.country = signupCredentialsDto.country;
      user.gender = signupCredentialsDto.gender;

      await user.save();
      return user;
    } else {
      throw new NotFoundException('user not found');
    }
  }
}
