import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import SingleThread from './pages/SingleThread';
import BlogThreads from './pages/Blog'
import SignupForm from './pages/SignupForm';
import LoginForm from './pages/LoginForm';
import Footer from './pages/Footer';

// import Profile from './pages/User';
import Header from './components/Header/Header';
// import Footer from './components/Footer';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex flex-col h-screen justify-between">
          <Header />
          <div className="">
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <LoginForm />
            </Route>
            <Route exact path="/signup">
              <SignupForm />
            </Route>
            {/* <Route exact path="/me">
              <Profile />
            </Route> */}
            {/* <Route exact path="/profiles/:username">
              <Profile />
            </Route> */}
            <Route exact path="/threads/:threadId">
              <SingleThread />
            </Route>
            <Route exact path="/threads">
              <BlogThreads />
            </Route>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
