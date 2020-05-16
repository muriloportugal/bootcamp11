import { createConnection } from 'typeorm';

createConnection().catch(error => {
  console.log(`\nError when connecting to database!\n${error}`);
});
