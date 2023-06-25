import * as cron from "cron";
import AnilistService from "./services/AnilistService";

export const DEV_MODE = false;

(() => {
  console.log("Starting a CRON job");
  const anilist = new AnilistService();

  if (!DEV_MODE) {
    console.log("Running in production mode.");
    const job = new cron.CronJob(
      "0 20 * * *",
      async () => await anilist.addActivity(),
      null,
      true,
      "Europe/Ljubljana"
    );
    job.start();
    console.log(
      `Job started, next run is at ${job.nextDate().toLocaleString()}`
    );
  } else {
    console.log("Running in development mode.");
    anilist.addActivity();
  }
})();
