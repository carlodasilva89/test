import React, { useState } from 'react';
import Navigation from './src/navigations/Navigation';
import { Provider } from 'react-redux'
import { store, persistor } from './src/store'
import { PersistGate } from 'redux-persist/integration/react'
import { ActivityIndicator, View } from 'react-native'
import tw from 'twrnc'

const App = () => {

  const loading = () =>{
    return(
        <View style={tw.style("absolute w-full h-full fixed top-0 left-0 bg-black opacity-75 z-50")}>
        <View style={tw.style("text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0")}>
            <ActivityIndicator size={70} color="#fff" />
        </View>
    </View>
    );
  }
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={loading()} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;