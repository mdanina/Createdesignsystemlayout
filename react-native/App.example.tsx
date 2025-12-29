/**
 * App.tsx - Main Entry Point Example
 * Пример главного файла приложения
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HomeScreen } from './examples/HomeScreen';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <HomeScreen />
    </GestureHandlerRootView>
  );
}

export default App;
