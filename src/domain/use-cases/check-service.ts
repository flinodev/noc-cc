export interface CheckServiceUserCase {
  execute(url: string): Promise<boolean>;
}

export class CheckService implements CheckServiceUserCase {
  constructor() {}
  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }
      console.log(`${url} is ok!`);
      return true;
    } catch (error) {
      console.log(`${error}`);
      return false;
    }
  }
}
