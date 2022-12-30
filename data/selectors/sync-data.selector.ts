import { selector } from 'recoil';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const syncDataSelector = selector({
  key: 'sync-data',
  get: async () => {
    const lastUpdatedPokedexDataKey = 'pokedex-data-last-updated';
    let appLastUpdated: number = parseInt((await AsyncStorage.getItem(lastUpdatedPokedexDataKey)) || '0', 10);
    let serverLastUpdated = await database().ref(lastUpdatedPokedexDataKey).once('value');
    // if (serverLastUpdated > (appLastUpdated || 0)) {

    // }
    console.log(serverLastUpdated);

    const lastUpdatedPokedexVersionsKey = 'pokedex-versions-last-updated';
    appLastUpdated = parseInt((await AsyncStorage.getItem(lastUpdatedPokedexVersionsKey)) || '0', 10);
  }
});
