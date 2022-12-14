import { db_init } from './models/db_init';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import { schema } from './schema/Schema';

import session from 'express-session';
import connectRedis from 'connect-redis';
import { redis } from './redis';

const main = async () => {
    const app = express();
    app.set('trust proxy', process.env.NODE_ENV !== 'production');
    // app.set('trust proxy', false);

    const RedisStore = connectRedis(session);

    const server = new ApolloServer({ schema, context: ({ req, res }) => ({ req, res }) });

    app.use(
        session({
            store: new RedisStore({
                client: redis,
            }),
            name: 'qid',
            secret: '1234',
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                // secure: true,
                // sameSite: 'none',
                maxAge: 1000 * 60 * 60 * 24 * 365,
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                path: '/',
            },
        }),
    );

    await server.start();

    server.applyMiddleware({
        app,
        cors: {
            credentials: true,
            origin: ['http://localhost:3000', 'https://studio.apollographql.com', 'https://colle.vercel.app'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        },
    });

    db_init();

    app.listen(process.env.PORT || 8800, () => {
        console.log(`server started on http://localhost:${process.env.PORT || 8800}/graphql`);
    });
};

main();
