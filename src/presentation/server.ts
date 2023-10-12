import { CheckService } from "../domain/use-cases/check-service";
import { CronService } from "./cron/cron-service";

export class Server {
  public static start() {
    console.log("Server started, now!");
    CronService.createJob("*/10 * * * * *", () => {
      const date = new Date();
      new CheckService().execute("https:google.com");
    });
  }
}
