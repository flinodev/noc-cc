import { CheckServiceMultiple } from "../domain/use-cases/check-service multiple";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasources";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fsLogRepository = new LogRepositoryImpl(new FileSystemDatasource());
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());
const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource()
);
//new FileSystemDatasource()
//const emailService = new EmailService();
export class Server {
  public static start() {
    console.log("Server started, now!");
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   "franksuriel_7@hotmail.com",
    // ]);
    CronService.createJob("*/15 * * * * *", () => {
      const url = "http://google.com";
      new CheckServiceMultiple(
        [fsLogRepository, mongoLogRepository, postgresLogRepository],
        () => console.log(`${url} is ok!`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
