import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);
export class Server {
  public static start() {
    console.log("Server started, now!");
    // const emailService = new EmailService(fileSystemLogRepository);
    // emailService.sendEmailWithFileSystemLogs(["franksuriel_7@hotmail.com"]);
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
