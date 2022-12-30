import React from 'react';
import { Text, View } from 'react-native';
import { typeChartData } from '../data/type-chart.data';
import { Type } from '../enums';
import { useTheme } from '../providers';
import PokemonType from './pokemon-type.component';

interface TypeChartProps {
	types: Type[]
}

const TypeChart: React.FC<TypeChartProps> = ({ types }) => {
  const { colors, fonts } = useTheme();
  const weaknesses: {[value: string]: Type[]} = {};

  Object.keys(typeChartData).forEach((key) => {
		const type: Type = key as Type;
    const value = (typeChartData[type][types[0]] * (types.length > 1 ? typeChartData[type][types[1]] : 1)).toString();
    weaknesses[value] = [...(weaknesses[value] || []), (key as Type)];
  });

  const getColor = (key: string) => {
    switch (key) {
      case '4':
        return colors.green;
      case '2':
        return `${colors.green}AA`;
      case '0.5':
        return `${colors.red}AA`;
      case '0.25':
        return colors.red;
      case '0':
        return colors.text;
      default:
        return colors.inputIcon;
    }
  };

  return (
    <View>
      {Object.keys(weaknesses).sort((a, b) => (a === '1' ? 1 : (b === '1' ? -1 : parseFloat(b) - parseFloat(a)))).map((key) => (
        <View
          key={key}
          style={{
            flexDirection: 'row',
            marginBottom: key === '1' ? 0 : 25,
          }}>
          <Text style={{
            width: 75,
            fontFamily: fonts.bold,
            fontSize: 16,
            color: getColor(key),
          }}>
            x
            {key}
          </Text>
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            flex: 1,
          }}>
            {weaknesses[key].map((type) => (
              <PokemonType
                key={type}
                type={type}
                style={{
                  marginBottom: 5,
                  marginRight: 5,
                }}
                large />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default TypeChart;
