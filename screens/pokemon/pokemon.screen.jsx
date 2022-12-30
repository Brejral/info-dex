import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { TabBar, TabView } from 'react-native-tab-view';
import { useDispatch, useSelector } from 'react-redux';
import PokemonIcon from '../../components/pokemon-icon.component';
import PokemonType from '../../components/pokemon-type.component';
import { leadingZeros } from '../../helpers';
import { useTheme } from '../../providers';
import { toggleCaught } from '../../redux/actions';
import Evolutions from './evolutions.component';
import Locations from './locations.component';
import Moves from './moves.component';
import Stats from './stats.component';

const Pokemon = () => {
  const navigation = useNavigation();
  const { params: { pokemon, formName } } = useRoute();
  const initialForm = pokemon.forms.find((x) => x.formName === formName);
  const [formIndex, setFormIndex] = useState(initialForm ? pokemon.forms.indexOf(initialForm) : 0);
  const [tabIndex, setTabIndex] = useState(0);
  const caughtPokemon = useSelector((state) => state.pokedex.caughtPokemon);
  const version = useSelector((state) => state.pokedex.version);
  const pokedexData = useSelector((state) => state.pokedex.pokedexData);
  const dispatch = useDispatch();
  const [routes] = React.useState([
    { key: 'stats', title: 'Stats' },
    { key: 'evolutions', title: 'Evolutions' },
    // { key: 'locations', title: 'Locations' },
    // { key: 'moves', title: 'Moves' },
  ]);
  const { colors, fonts, isDark } = useTheme();
  const form = pokemon.forms[formIndex];
  const pokemonForm = { ...pokemon, ...form };
  const number = leadingZeros(version !== 'National' ? pokemonForm.localNumbers[version] : pokemonForm.number, 3);
  const firstType = pokemonForm.types[0].toLowerCase();
  const [backButtonHit, setBackButtonHit] = useState(false);
  const typeColor = colors[firstType];
  const renderTabs = ({ route }) => {
    switch (route.key) {
      case 'stats':
        return <Stats pokemon={pokemonForm} />;
      case 'evolutions':
        return (
          <Evolutions
            pokemon={pokemonForm}
            pokedexData={pokedexData} />
        );
      case 'moves':
        return <Moves pokemon={pokemonForm} />;
      case 'locations':
        return <Locations pokemon={pokemonForm} />;
      default:
        return null;
    }
  };

  const styles = StyleSheet.create({
    screen: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: colors.background,
    },
    container: { flexDirection: 'column' },
    top: {
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
      height: 310,
    },
    back: {
      marginHorizontal: 16,
      marginTop: 6,
    },
    name: {
      fontFamily: fonts.bold,
      fontSize: 34,
      color: colors.background,
    },
    number: {
      color: `${colors.background}B0`,
      fontSize: 22,
      fontFamily: fonts.bold,
      marginBottom: 3,
      marginLeft: 4,
    },
    backgroundIcon: {
      position: 'absolute',
      color: `${colors.background}30`,
      bottom: 0,
      left: -20,
    },
    image: {
      height: pokemon.forms.length === 1 ? 180 : 160,
      width: pokemon.forms.length === 1 ? 260 : 230,
      alignSelf: 'center',
    },
    formText: {
      fontFamily: fonts.bold,
      color: colors.background,
      width: '100%',
      textAlign: 'center',
      marginTop: 2,
      fontSize: 18,
    },
    tabs: { backgroundColor: colors.transparent },
    catch: {
      marginRight: 15,
      marginTop: 8,
    },
    currentFormDot: {
      height: 8,
      width: 8,
      borderRadius: 4,
      backgroundColor: colors.background,
      marginHorizontal: 4,
    },
    formDot: {
      height: 4,
      width: 4,
      borderRadius: 2,
      backgroundColor: colors.background,
      opacity: 0.54,
      marginHorizontal: 6,
    },
  });
  const sWidth = Dimensions.get('window').width;

  return (
    <View style={styles.screen}>
      {!backButtonHit && <StatusBar barStyle={isDark ? 'dark-content' : 'light-content'} />}
      <Svg
        style={{ position: 'absolute' }}
        height={310}
        width={sWidth * 2}>
        <Defs>
          <LinearGradient
            id="grad">
            <Stop
              offset="25%"
              stopColor={typeColor}
              stopOpacity="0.54" />
            <Stop
              offset="75%"
              stopColor={typeColor}
              stopOpacity="0.8" />
          </LinearGradient>
        </Defs>
        <Circle
          cx={sWidth / 2}
          cy={`-${800 - 310 + 2}`}
          r={800}
          fill="url(#grad)" />
      </Svg>
      <View
        style={styles.top}>
        <PokemonIcon
          style={styles.backgroundIcon}
          name={firstType}
          size={160} />
        <SafeAreaView style={styles.container}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableWithoutFeedback
              style={styles.back}
              onPress={() => {
                setBackButtonHit(true);
                navigation.popToTop();
              }}>
              <FontAwesome5
                color={colors.background}
                size={28}
                name="chevron-left" />
            </TouchableWithoutFeedback>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <Text style={styles.name}>{pokemonForm.name}</Text>
                <Text style={styles.number}>
                  #
                  {number}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                {pokemonForm.types.map((type) => (
                  <PokemonType
                    type={type}
                    style={{ marginRight: 4, marginTop: 0 }}
                    key={type} />
                ))}
              </View>
            </View>
            <TouchableWithoutFeedback
              style={styles.catch}
              onPress={() => dispatch(toggleCaught(pokemonForm.number))}>
              <PokemonIcon
                name="pokeball"
                backgroundColor={colors.transparent}
                size={25}
                color={`${colors.background}${caughtPokemon[version][pokemonForm.number] ? '' : '30'}`} />
            </TouchableWithoutFeedback>
          </View>
          <Carousel
            data={pokemon.forms}
            windowSize={sWidth}
            onSnapToItem={(index) => setFormIndex(index)}
            style={{ backgroundColor: 'red' }}
            scrollEnabled={pokemon.forms.length > 1}
            sliderWidth={sWidth}
            firstItem={formIndex}
            itemWidth={225}
            renderItem={({ item }) => (
              <View style={{ marginTop: 5 }}>
                <Image
                  resizeMode="contain"
                  uri={item.image}
                  style={styles.image} />
                { pokemon.forms.length > 1 && <Text style={styles.formText}>{item.formName}</Text>}
              </View>
            )} />
          { pokemon.forms.length > 1 && (
          <View style={{ height: 12, width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 4 }}>
            {pokemon.forms.map((f, index) => (
              <View
                style={index === formIndex ? styles.currentFormDot : styles.formDot}
                key={index.toString()} />
            ))}
          </View>
          )}
        </SafeAreaView>
      </View>
      <View style={{ flex: 1, backgroundColor: colors.transparent, borderRadius: 30, marginTop: -15 }}>
        <TabView
          navigationState={{ index: tabIndex, routes }}
          renderScene={renderTabs}
          onIndexChange={setTabIndex}
          style={styles.tabs}
          initialLayout={{ width: Dimensions.get('window').width }}
          renderTabBar={(props) => (
            <TabBar
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...props}
              inactiveColor={colors.inputIcon}
              activeColor={colors[firstType]}
              style={{ backgroundColor: colors.transparent, height: 46 }}
              labelStyle={{ fontFamily: fonts.bold, textTransform: 'capitalize', fontSize: 15 }}
              indicatorStyle={{ backgroundColor: colors[firstType], height: 4 }} />
          )} />
      </View>
    </View>
  );
};

export default Pokemon;
