import { CronService } from "./cron/cron-service";

export class Server {
  public static start() {
    console.log("Server started, now!");
    CronService.createJob("*/10 * * * * *", () => {
      const date = new Date();
      console.log("10 seconds ", date);
    });
  }
}
