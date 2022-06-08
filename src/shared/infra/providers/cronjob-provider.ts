import { ICronJobProvider } from '@shared/domain/providers/cronjob-provider';
import { CronJobStartDTO } from '@shared/dtos/cronjob-start-dto';
import { Maybe } from '@shared/types/maybe';
import { CronJob } from 'cron';

class CronJobProvider implements ICronJobProvider {
  private job: Maybe<CronJob>;

  async run({ cronTime, onTick }: CronJobStartDTO): Promise<void> {
    const job = new CronJob(cronTime, onTick, null, true, 'America/New_York');

    job.start();

    this.job = job;
  }

  async stop(): Promise<void> {
    if (this.job) this.job.stop();
  }
}

export { CronJobProvider };
