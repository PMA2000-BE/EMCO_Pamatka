import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://Поменяйте айпи здесь:3000/api/graphql',
  cache: new InMemoryCache(),
});

export default client;

