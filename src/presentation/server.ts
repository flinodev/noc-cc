import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/check-service";
import { SendEmailLogs } from "../domain/use-cases/emails/send-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);
//const emailService = new EmailService();
export class Server {
  public static start() {
    console.log("Server started, now!");
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   "franksuriel_7@hotmail.com",
    // ]);
    CronService.createJob("*/5 * * * * *", () => {
      const url = "http://localhost:3000/posts";
      new CheckService(
        fileSystemLogRepository,
        () => console.log(`${url} is ok!`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
