import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Test from './src/modules/Test'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './src/redux/store'
import ErrorTest from './src/modules/ErrorTest'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Test />
      </PersistGate>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})