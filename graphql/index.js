import express from 'express';
import graphQLHTTP from 'express-graphql';
import schema from '../data/schema';

let app = express();
app.use(graphQLHTTP({schema, pretty: true}));

export default app;
