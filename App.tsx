import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import Test from './src/modules/Test';
import { persistor, store } from './src/redux/store';
import SecondTest from './src/modules/SecondTest';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SecondTest />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
