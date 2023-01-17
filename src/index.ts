import * as cron from 'cron';
import AnilistService from './services/AnilistService';

(() => {
    console.log('Starting a CRON job');
    const anilist = new AnilistService();
    const job = new cron.CronJob(
        '0 20 * * *',
        async () => await anilist.addActivity(),
        null,
        true,
        'Europe/Ljubljana'
    );
    job.start();
    console.log(`Job started, next run is at ${job.nextDate().toLocaleString()}`);
})();
