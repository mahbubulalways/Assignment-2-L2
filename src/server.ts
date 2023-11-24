import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main() {
  try {
    // here is database connection
    // port and db uri import from config file
    await mongoose.connect(config.DB_URI as string);
    app.listen(config.PORT, () => {
      console.log(`Example app listening on port ${config.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
