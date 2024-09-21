import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { ApolloClient, ApolloProvider, HttpLink, from, InMemoryCache, concat, ApolloLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import paths from './routes/paths.ts';

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ massage, location, path }) => {
      alert(`Graphql error ${massage} ${location} ${path}`);
    });
  }
});


const httpLink = from([errorLink, new HttpLink({ uri: process.env.APP_API_URL })]);


const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
    }
  });
  
  return forward(operation);
})

const logoutLink = onError(({graphQLErrors}) => {
  console.log('hi', graphQLErrors)
  if(graphQLErrors) {
    graphQLErrors.map(({status}) => {
      console.log(graphQLErrors)
      if(status === 403) window.location.href = paths.LOGIN_PATH
    })
  }
})
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    authMiddleware,
    logoutLink,
    httpLink
  ]),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
);
