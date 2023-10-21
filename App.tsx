import React from 'react';
import Test from './src/modules/Test';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Test />
      </PersistGate>
    </Provider>
  );
};

export default App;
