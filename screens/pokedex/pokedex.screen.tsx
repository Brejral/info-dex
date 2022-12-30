import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Animated, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import PokemonIcon from '../../components/pokemon-icon.component';
import { useTheme } from '../../providers';
import { toggleCaught, updateVersion } from '../../redux/actions';
import RootReducer from '../../redux/reducers/root.reducer';
import Pokemon from './pokemon.component';

const sideMenuWidth = 280;

const Pokedex = () => {
  const { colors, fonts, isDark, setScheme } = useTheme();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const pokedex = useSelector((state: RootReducer.State) => state.pokedex.pokedexData);
  const pokedexVersionData = useSelector((state: RootReducer.State) => state.pokedex.pokedexVersionData);
  const pokedexVersions = useSelector((state: RootReducer.State) => state.pokedex.pokedexVersions);
  const [filterString, setFilterString] = useState('');
  const [pokemonList] = useState(Object.values(pokedexVersionData).map((x) => pokedex[x.number]));
  const version = useSelector((state: RootReducer.State) => state.pokedex.version);
  const subVersion = useSelector((state: RootReducer.State) => state.pokedex.subVersion || state.pokedex.version);
  const caughtPokemon = useSelector((state: RootReducer.State) => state.pokedex.caughtPokemon);
  const dispatch = useDispatch();
  const opacityAnimation = useRef(new Animated.Value(0)).current;
  const positionAnimation = useRef(new Animated.Value(0)).current;

  const styles = StyleSheet.create({
    screen: {
      backgroundColor: colors.background,
      flex: 1,
      flexDirection: 'column',
    },
    container: { flex: 1 },
    backgroundIcon: {
      position: 'absolute',
      color: `${colors.text}0A`,
      top: -70,
      right: -45,
    },
    navBar: {
      marginTop: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    navBarMenu: {
      margin: 10,
      color: colors.text,
    },
    navBarTitle: {
      fontSize: 36,
      fontFamily: fonts.black,
      fontWeight: '900',
      color: colors.primary,
      textAlign: 'left',
      flex: 1,
    },
    list: { backgroundColor: colors.transparent },
    ads: {
      height: 75,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'gray',
    },
    search: {
      alignSelf: 'center',
      width: '94%',
      padding: 0,
      height: 40,
      borderWidth: 0,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.inputBackground,
      borderRadius: 20,
      marginVertical: 8,
    },
    searchIcon: {
      color: colors.inputIcon,
      marginHorizontal: 10,
    },
    searchInput: {
      fontSize: 16,
      color: colors.text,
      flex: 1,
    },
    sideMenuContainer: {
      position: 'absolute',
      flexDirection: 'row',
      top: 0,
      left: -sideMenuWidth,
      right: 0,
      bottom: 0,
      zIndex: 2,
      backgroundColor: '#000000A0',
    },
    sideMenu: {
      width: sideMenuWidth,
      backgroundColor: `${colors.background}FF`,
      top: 0,
      left: 0,
      bottom: 0,
    },
    sideMenuTitle: {
      fontFamily: fonts.black,
      color: colors.primary,
      fontSize: 24,
      marginLeft: 10,
      marginVertical: 12,
    },
    sideMenuOptionDot: {
      borderRadius: 4,
      backgroundColor: `${colors.text}AA`,
      height: 8,
      width: 8,
      marginHorizontal: 18,
      alignSelf: 'center',
    },
    sideMenuOptionDotSelected: {
      color: colors.text,
      marginHorizontal: 10,
      alignSelf: 'center',
    },
    sideMenuOptionText: {
      fontFamily: fonts.medium,
      marginVertical: 12,
      color: `${colors.text}AA`,
      fontSize: 14,
    },
    sideMenuOptionTextSelected: {
      fontFamily: fonts.black,
      color: colors.text,
    },
    sideMenuSubOption: { paddingLeft: 20 },
  });

  const showSideMenu = (show: boolean) => {
    if (show) {
      setIsSideMenuOpen(show);
    }
    Animated.timing(opacityAnimation, {
      toValue: show ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setIsSideMenuOpen(show));
    Animated.timing(positionAnimation, {
      toValue: show ? sideMenuWidth : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.screen}>
      <PokemonIcon
        style={styles.backgroundIcon}
        name="pokeball"
        size={210} />

      <SafeAreaView style={styles.container}>
        <View style={styles.navBar}>
          <TouchableWithoutFeedback onPress={() => showSideMenu(true)}>
            <Ionicons
              name="menu"
              size={28}
              style={styles.navBarMenu} />
          </TouchableWithoutFeedback>
          <Text style={styles.navBarTitle}>InfoDex</Text>
        </View>
        <View style={styles.search}>
          <FontAwesome5
            name="search"
            size={20}
            style={styles.searchIcon} />
          <TextInput
            value={filterString}
            onChangeText={(str) => setFilterString(str)}
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor={colors.inputIcon} />
        </View>
        <FlatList
          style={styles.list}
          data={pokemonList}
          keyExtractor={(item) => item.number.toString()}
          renderItem={({ item }) => (
            <Pokemon
              item={item}
              version={subVersion}
              caught={!!caughtPokemon[version][item.number]}
              onCaughtPress={() => dispatch(toggleCaught(item.number))} />
          )} />
        <View style={styles.ads}>
          <Text>Ads</Text>
        </View>
      </SafeAreaView>

      {isSideMenuOpen
      && (
        <Animated.View
          style={[styles.sideMenuContainer, { transform: [{ translateX: positionAnimation }], opacity: opacityAnimation }]}>
          <View style={styles.sideMenu}>
            <SafeAreaView style={{ flex: 1 }}>
              <View style={{ flexDirection: 'column', flex: 1 }}>
                <Text style={styles.sideMenuTitle}>Version</Text>
                <View style={{ flex: 4 }}>
                  <ScrollView>
                    <View style={{ width: 4, backgroundColor: colors.inputIcon, borderRadius: 2, marginHorizontal: 20, position: 'absolute', top: 0, bottom: 0 }} />
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ flexDirection: 'column' }}>
                        {pokedexVersions && pokedexVersions.map((x, index) => {
                          if (typeof x === 'string') {
                            return (
                              <TouchableOpacity
                                key={x}
                                onPress={() => dispatch(updateVersion(x))}>
                                <View style={{ flexDirection: 'row' }}>
                                  {x === subVersion
                                    ? (
                                      <PokemonIcon
                                        style={styles.sideMenuOptionDotSelected}
                                        name="pokeball"
                                        size={24} />
                                    ) : <View style={styles.sideMenuOptionDot} />}
                                  <Text style={[styles.sideMenuOptionText, x === subVersion ? styles.sideMenuOptionTextSelected : {}]}>{x}</Text>
                                </View>
                              </TouchableOpacity>
                            );
                          }

                          return (
                            <View key={index.toString()}>
                              {x.map((y, subIndex) => (
                                <TouchableOpacity
                                  key={y}
                                  onPress={() => dispatch(updateVersion(x[0], y))}>
                                  <View style={{ flexDirection: 'row' }}>
                                    {y === subVersion
                                      ? (
                                        <PokemonIcon
                                          style={styles.sideMenuOptionDotSelected}
                                          name="pokeball"
                                          size={24} />
                                      ) : <View style={styles.sideMenuOptionDot} />}
                                    <Text style={[
                                      styles.sideMenuOptionText,
                                      y === subVersion ? styles.sideMenuOptionTextSelected : {},
                                      subIndex === 0 ? {} : styles.sideMenuSubOption]}>
                                      {y}
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                              ))}
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  </ScrollView>
                </View>
                <Text style={styles.sideMenuTitle}>Theme</Text>
                <View style={{ }}>
                  <View style={{ width: 4, backgroundColor: colors.inputIcon, borderRadius: 2, marginHorizontal: 20, position: 'absolute', top: 0, bottom: 0 }} />
                  <TouchableOpacity onPress={() => setScheme('light')}>
                    <View style={{ flexDirection: 'row' }}>
                      {!isDark
                        ? (
                          <PokemonIcon
                            style={styles.sideMenuOptionDotSelected}
                            name="pokeball"
                            size={24} />
                        ) : <View style={styles.sideMenuOptionDot} />}
                      <Text style={[styles.sideMenuOptionText, !isDark ? styles.sideMenuOptionTextSelected : {}]}>Light</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setScheme('dark')}>
                    <View style={{ flexDirection: 'row' }}>
                      {isDark
                        ? (
                          <PokemonIcon
                            style={styles.sideMenuOptionDotSelected}
                            name="pokeball"
                            size={24} />
                        ) : <View style={styles.sideMenuOptionDot} />}
                      <Text style={[styles.sideMenuOptionText, isDark ? styles.sideMenuOptionTextSelected : {}]}>Dark</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </SafeAreaView>
          </View>

          <TouchableWithoutFeedback
            containerStyle={{ flex: 1 }}
            onPress={() => showSideMenu(false)} />
        </Animated.View>
      )}
    </View>
  );
};

export default Pokedex;
