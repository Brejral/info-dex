// /* eslint-disable no-await-in-loop */
// /* eslint-disable import/prefer-default-export */

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { updatePokedexData, updateVersions } from '../redux/actions';
// import firebaseDb from '@react-native-firebase/database';
// import firebaseStorage from '@react-native-firebase/storage';

// export const syncData = () => {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const checkData = async () => {
//       // Check for new Updates to Pokedex Data
//       const lastUpdatedPokedexDataKey = 'pokedex-data-last-updated';
//       let appLastUpdated: number = parseInt(
//         (await AsyncStorage.getItem(lastUpdatedPokedexDataKey)) || '0',
//         10
//       );
//       let serverLastUpdated: number = await new Promise((resolve) =>
//         firebaseDb()
//           .ref(lastUpdatedPokedexDataKey)
//           .on('value', (value: any) => resolve(value.val()))
//       );
//       if (serverLastUpdated > (appLastUpdated || 0)) {
//         const pokedexDataRef = firebaseStorage().ref('data/pokedex-data.json');
//         const downloadUrl = await pokedexDataRef.getDownloadURL();
//         const { data } = await axios.get(downloadUrl);
//         if (data) {
//           await AsyncStorage.setItem(
//             lastUpdatedPokedexDataKey,
//             serverLastUpdated.toString()
//           );
//           console.log('data updated');
//           dispatch(updatePokedexData(data));
//         }
//       }

//       const lastUpdatedPokedexVersionsKey = 'pokedex-versions-last-updated';
//       appLastUpdated = parseInt(
//         (await AsyncStorage.getItem(lastUpdatedPokedexVersionsKey)) || '0',
//         10
//       );
//       serverLastUpdated = await new Promise((resolve) =>
//         firebaseDb()
//           .ref(lastUpdatedPokedexVersionsKey)
//           .on('value', (value: any) => resolve(value.val()))
//       );
//       if (serverLastUpdated > (appLastUpdated || 0)) {
//         const pokedexDataRef = firebaseStorage().ref(
//           'data/pokedex-versions.json'
//         );
//         const downloadUrl = await pokedexDataRef.getDownloadURL();
//         const { data } = await axios.get(downloadUrl);
//         if (data) {
//           await AsyncStorage.setItem(
//             lastUpdatedPokedexVersionsKey,
//             serverLastUpdated.toString()
//           );
//           console.log('versions updated');
//           dispatch(updateVersions(data));
//         }
//       }
//       setIsLoaded(true);
//     };

//     checkData();
//   }, []);

//   return [isLoaded];
// };
