import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
    return {
        database: {
          host: process.env.DATABASE_HOST,
          port: process.env.DATABASE_PORT,
        },
        apiKey: process.env.API_KEY,
    }
});
