import { MongoClient, ServerApiVersion } from 'mongodb';

const dbPass = process.env.MONGODB_PASS;
const dbUser = process.env.MONGODB_USER;
const clusterUrl = 'dev.hynyi.mongodb.net';
const connectionOptions = 'retryWrites=true&w=majority';

const uri = `mongodb+srv://${dbUser}:${dbPass}@${clusterUrl}/?${connectionOptions}`;

export const dbClient = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1,
});

(async () => {
  console.log('\nConnecting do MongoDB...');
  await dbClient.connect();
  console.log('\nConnected successfully!');
})();

process.on('SIGINT', async () => {
  console.log('\n\nClosing mongo client...');

  await dbClient.close();

  console.log(`\nI've been murdered!!!\n`);

  process.exit();
});
