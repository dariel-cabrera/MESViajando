import { AppDataSource } from '../data-source';
import { runSeeders } from 'typeorm-extension';

async function run() {
  await AppDataSource.initialize();
  await runSeeders(AppDataSource);
  await AppDataSource.destroy();
}

run().catch(console.error);

