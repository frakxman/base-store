import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from '../config';
import { MongooseModule } from '@nestjs/mongoose';

/**
 * Global module for database connection.
 * This module sets up the connection to the MongoDB database using Mongoose.
 */
@Global()
@Module({
    imports: [
        MongooseModule.forRootAsync({
            /**
             * Asynchronously provides the MongoDB connection URI.
             * @param configService - The configuration service to access environment variables.
             * @returns An object containing the MongoDB connection URI.
             */
            useFactory: async (configService: ConfigType<typeof config>) => {
                const { conection, user, password, host, port, db } = configService.mongo;
                const uri = `${conection}://${user}:${password}@${host}:${port}/${db}?authSource=admin`;
                return { uri };
            },
            inject: [config.KEY]
        }),
    ],
    exports: [MongooseModule]
})
export class DatabaseModule {}