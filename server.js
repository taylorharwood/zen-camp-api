const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apolloServerExpress = require('apollo-server-express');
const graphQLTools = require('graphql-tools');
const logger = require('morgan');

const schema = require('./src/graphql/schema');
const resolvers = require('./src/graphql/resolvers');

const PORT = 8080;

const app = express();

// todo: restrict to certain domains
app.use(cors());

app.use(logger('common'));

const graphQLSchema = graphQLTools.makeExecutableSchema({ typeDefs: schema, resolvers });

app.use('/graphiql', apolloServerExpress.graphiqlExpress({
  endpointURL: '/graphql',
}));

app.use('/graphql', bodyParser.json(), apolloServerExpress.graphqlExpress({ schema: graphQLSchema }));

app.listen(process.env.PORT || PORT);
console.log('Listening on port ' + (process.env.PORT || PORT));
