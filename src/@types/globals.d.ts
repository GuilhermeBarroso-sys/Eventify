interface ICurrentUser {
  id: string;
  email: string;
}

declare module globalThis {
  namespace Express {
    export interface Request {
      user: ICurrentUser | undefined
    }
  }
}