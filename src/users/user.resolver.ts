import { User } from './entities/user.entity';
import { Resolver, Query } from '@nestjs/graphql';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UserRsolver {
  constructor(private userService: UsersService) {}
  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }
}
