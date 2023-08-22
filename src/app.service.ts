import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `<h1 align="center">Добро пожаловать!</h1>
    <h1 align="center">Это проект Test1 Project.</h1>`;
  }
}
