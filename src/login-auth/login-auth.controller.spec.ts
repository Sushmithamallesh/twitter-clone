import { Test, TestingModule } from '@nestjs/testing';
import { LoginAuthController } from './login-auth.controller';

describe('LoginAuthController', () => {
  let controller: LoginAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginAuthController],
    }).compile();

    controller = module.get<LoginAuthController>(LoginAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
