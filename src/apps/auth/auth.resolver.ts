import { AuthService } from '@/auth/auth.service';
import { LoginInput } from '@/auth/dto/login-auth-input';
import { LoginResponse } from '@/auth/dto/login-response.input';
import { Resolver, Mutation, Args } from '@nestjs/graphql';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<LoginResponse> {
    const user = await this.authService.validateUser(
      loginInput.email,
      loginInput.password,
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }
    const accessToken = await this.authService.login(user);
    return { accessToken: accessToken.access_token };
  }
}
