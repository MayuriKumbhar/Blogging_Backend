import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { SignupCredentialsDTO } from './dto/signup.credentials.dto';
import * as crypto from 'crypto-js';
import { AuthCredentialsDTO } from './dto/auth.credentials.dto';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async signup(signupcredentialsDto: SignupCredentialsDTO) {
    const user = new UserEntity();
    user.firstname = signupcredentialsDto.firstname;
    user.lastname = signupcredentialsDto.lastname;
    user.email = signupcredentialsDto.email;
    user.password = `${crypto.MD5(signupcredentialsDto.password)}`;
    user.city = signupcredentialsDto.city;
    user.country = signupcredentialsDto.country;
    user.gender = signupcredentialsDto.gender;

    await user.save();
  }

  async signin(authCredentialsDto: AuthCredentialsDTO) {
    const { email, password } = authCredentialsDto;
    const user = await this.findOne({ email });
    console.log(user);
    if (!user) {
      return null;
    }
    if (!user.validatePassword(password)) {
      return null;
    }
    return user;
  }

}
