import { CheckService } from "../domain/use-cases/check-service";
import { SendEmailLogs } from "../domain/use-cases/emails/send-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasources";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";

const logRepository = new LogRepositoryImpl(
  //new FileSystemDatasource()
  new MongoLogDatasource()
);
//const emailService = new EmailService();
export class Server {
  public static start() {
    console.log("Server started, now!");
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   "franksuriel_7@hotmail.com",
    // ]);
    CronService.createJob("*/5 * * * * *", () => {
      const url = "http://google.com";
      new CheckService(
        logRepository,
        () => console.log(`${url} is ok!`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
