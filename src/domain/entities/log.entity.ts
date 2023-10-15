export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}
export interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public origin: string;
  public createdAt: Date;

  constructor(options: LogEntityOptions) {
    const { message, level, origin, createdAt = new Date() } = options;
    this.message = message;
    this.level = level;
    this.origin = origin;
    this.createdAt = createdAt;
  }

  static fromJson(json: string): LogEntity {
    const { message, level, origin, createdAt } = JSON.parse(json);
    const log = new LogEntity({ message, level, origin, createdAt });
    log.createdAt = new Date(createdAt);
    return log;
  }

  static fromObject(object: { [key: string]: any }): LogEntity {
    const { message, level, createdAt, origin } = object;
    const log = new LogEntity({
      message,
      level,
      createdAt,
      origin,
    });
    return log;
  }
}
