import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
    return {
        database: {
          host: process.env.DATABASE_HOST,
          port: process.env.DATABASE_PORT,
        },
        mongo: {
          conection: process.env.MONGO_CONNECTION,
          user: process.env.MONGO_USER,
          password: process.env.MONGO_PASSWORD,
          host: process.env.MONGO_HOST,
          port: parseInt(process.env.MONGO_PORT || '27017', 10),
          db: process.env.MONGO_DB,
        },
        apiKey: process.env.API_KEY,
    }
});
