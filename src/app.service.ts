import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `<h1>Добро пожаловать!</h1>
    <h1>Это проект Test1 Project.</h1>`;
  }
}
