import { IJwt } from './jwt.interface';

export interface IConfig {
  port: number;

  cookies: {
    secret: string;
  };
  slack: {
    ordersChannel: string;
  };
}
