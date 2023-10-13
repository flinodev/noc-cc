import { CheckService } from "../domain/use-cases/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);
export class Server {
  public static start() {
    console.log("Server started, now!");
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
