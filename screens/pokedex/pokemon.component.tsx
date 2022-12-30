import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import PokemonIcon from '../../components/pokemon-icon.component';
import PokemonType from '../../components/pokemon-type.component';
import { Type } from '../../enums';
import { leadingZeros } from '../../helpers';
import { Pokemon } from '../../models';
import { useTheme } from '../../providers';

let renderCount = 0;

interface PokemonProps {
  item: Pokemon;
  caught: boolean;
  onCaughtPress: () => void;
  version: string;
};

const PokemonComponent: React.FC<PokemonProps> = React.memo(({ item, caught, onCaughtPress, version }) => {
  const navigation = useNavigation();
  const { colors, fonts } = useTheme();
  const styles = StyleSheet.create({
    item: {
      width: '94%',
      height: 100,
      marginVertical: 8,
      borderRadius: 20,
      alignSelf: 'center',
      overflow: 'hidden',
    },
    gradient: { flexDirection: 'row' },
    image: {
      height: 76,
      width: 90,
      marginHorizontal: 12,
      marginVertical: 12,
      // resizeMode: 'contain',
    },
    info: {
      paddingVertical: 14,
      flexDirection: 'column',
      flex: 1,
    },
    text: {
      color: colors.background,
      fontFamily: fonts.bold,
      fontSize: 28,
    },
    types: {
      flexDirection: 'row',
      marginTop: 2,
    },
    typeItem: { marginRight: 4 },
    number: {
      position: 'absolute',
      color: `${colors.background}80`,
      fontSize: 40,
      fontFamily: fonts.bold,
      bottom: -10,
      right: 4,
    },
    backgroundIcon: {
      position: 'absolute',
      color: `${colors.background}30`,
      bottom: -10,
      left: -10,
    },
    catch: { padding: 10 },
  });

  const number = leadingZeros(version !== 'National' ? item.localNumbers[version] : item.number, 3);
  const firstType = (item.types[0].toLowerCase() as Type);
  const typeColor = colors[firstType];
  const gradientColors = [`${typeColor}8A`, `${typeColor}CC`];

  return (
    <TouchableHighlight
      style={styles.item}
      activeOpacity={0.6}
      underlayColor={colors.transparent}
      onPress={() => navigation.navigate('Pokemon', { pokemon: item })}>
      <LinearGradient
        style={styles.gradient}
        colors={gradientColors}
        start={{ x: 0.05, y: 0.5 }}
        end={{ x: 0.95, y: 0.5 }}>
        <PokemonIcon
          style={styles.backgroundIcon}
          name={firstType}
          size={80} />
        <Text style={styles.number}>{`#${number}`}</Text>
        <Image
          uri={item.forms[0].image}
          style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.text}>{item.name}</Text>
          <View style={styles.types}>
            {item.types.map((type) => (
              <PokemonType
                type={type}
                style={styles.typeItem}
                key={type} />
            ))}
          </View>
        </View>
        <View>
          <TouchableWithoutFeedback
            style={styles.catch}
            onPress={onCaughtPress}>
            <PokemonIcon
              name="pokeball"
              backgroundColor={colors.transparent}
              size={25}
              color={`${colors.background}${caught ? '' : '30'}`} />
          </TouchableWithoutFeedback>
        </View>
      </LinearGradient>
    </TouchableHighlight>
  );
}, (prevProps, nextProps) => prevProps.item.number === nextProps.item.number && prevProps.caught === nextProps.caught);

export default PokemonComponent;
