import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongoClient } from 'mongodb';
import config from '../config';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: async (configService: ConfigType<typeof config>) => {
                const { conection, user, password, host, port, db } = configService.mongo;
                const uri = `${conection}://${user}:${password}@${host}:${port}/${db}?authSource=admin`;
                return { uri };
            },
            inject: [config.KEY]
        }),
    ],
    providers: [
        {
            provide: 'MONGO',
            useFactory: async (configService: ConfigType<typeof config>) => {
                const { conection, user, password, host, port, db } = configService.mongo;
                const uri = `${conection}://${user}:${password}@${host}:${port}/${db}?authSource=admin`;
                const client = new MongoClient(uri);
                await client.connect();
                const database = client.db(db);
                return database;
            },
            inject: [config.KEY]
        }
    ],
    exports: ['MONGO', MongooseModule]
})
export class DatabaseModule {}