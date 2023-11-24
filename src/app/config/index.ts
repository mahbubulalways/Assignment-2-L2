import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  DB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
  BCRYPT_SALT: process.env.BCRYPT_SALT,
};
