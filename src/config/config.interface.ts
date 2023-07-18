export interface IConfig {
  port: number;

  cookies: {
    secret: string;
  };
  slack: {
    ordersChannel: string;
  };
}
