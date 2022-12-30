import AppLoading from 'expo-app-loading';
import React, { useEffect } from 'react';
import Main from './Main';
import { ThemeProvider } from './providers';
import firebase from '@react-native-firebase/app';
import { Text } from 'react-native';
import { useRecoilValueLoadable } from 'recoil';
import { syncDataSelector } from './data';

const firebaseConfig = {
  apiKey: 'AIzaSyCDyHSJJLykaDiJeynV8S8gTq-uuqwRbJA',
  authDomain: 'infodex-a2a66.firebaseapp.com',
  databaseURL: 'https://infodex-a2a66-default-rtdb.firebaseio.com/',
  projectId: 'infodex-a2a66',
  storageBucket: 'gs://infodex-a2a66.appspot.com',
  appId: '1:978393391291:ios:3ab4f2ff463784c8c9899e'
};

firebase.initializeApp(firebaseConfig);

const App = () => {
  const syncDataLoadable = useRecoilValueLoadable(syncDataSelector);

  return (
    <ThemeProvider>
      <Text>Test</Text>
      {/* <Main /> */}
    </ThemeProvider>
  );
};

export default App;
