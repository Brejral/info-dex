import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../providers';
import PokemonIcon from './pokemon-icon.component';

const PokemonType = ({ type, style, large }) => {
  const { colors, fonts } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: colors[type.toLowerCase()],
      borderRadius: 12,
      alignItems: 'center',
      paddingVertical: large ? 2 : 1,
      paddingHorizontal: large ? 8 : 4,
    },
    icon: {
      alignSelf: 'center',
      marginRight: 4,
    },
    text: {
      color: colors.background,
      fontSize: large ? 13 : 11,
      fontFamily: fonts.bold,
      paddingTop: 1,
      alignSelf: 'center',
    },
  });

  return (
    <View style={[styles.container, style]}>
      <PokemonIcon
        name={type.toLowerCase()}
        color={colors.background}
        size={large ? 12 : 10}
        style={styles.icon} />
      <Text style={styles.text}>{type.toUpperCase()}</Text>
    </View>
  );
};

PokemonType.propTypes = {
  type: PropTypes.string.isRequired,
  style: PropTypes.objectOf(PropTypes.any),
  large: PropTypes.bool,
};

PokemonType.defaultProps = { style: {}, large: false };

export default React.memo(PokemonType, (prev, next) => prev.type === next.type);
