interface ICurrentUser {
  id: string;
  name: string;
  email: string;
}

declare module globalThis {
  namespace Express {
    export interface Request {
      user: ICurrentUser | undefined
    }
  }
}