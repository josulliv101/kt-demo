import express from 'express';
import graphQL from './graphql'; // GraphQL Server
import path from 'path';
import auth from './authentication';

var {PORT, NODE_ENV, PWD} = process.env;

var app = express();

app.use(express.static(path.join(PWD, 'public')))
app.use('/graphql', graphQL);
app.use('/*', auth.middleware.public);
app.use(auth.handleNotAuthenticatedError); // user not authenticated

// test
app.get("/", (req, res) => {
    res.json({hello: 'world'});
});
 
var server = app.listen(PORT, () => {
    console.log('Service started on port :' + PORT);
});