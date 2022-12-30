/* eslint-disable no-mixed-operators */
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import TypeChart from '../../components/type-chart.component';
import { leadingZeros } from '../../helpers';
import { useTheme } from '../../providers';

const Stats = ({ pokemon }) => {
  const { colors, fonts } = useTheme();
  const firstType = pokemon.types[0].toLowerCase();
  const stats = ['HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed', 'Total'];
  const typeColor = colors[firstType];
  const gradientColors = [`${typeColor}6A`, `${typeColor}CC`];

  const styles = StyleSheet.create({
    header: {
      color: colors[firstType],
      fontFamily: fonts.bold,
      marginVertical: 16,
      fontSize: 24,
    },
    statHeader: {
      fontFamily: fonts.bold,
      fontSize: 15,
      color: colors.text,
      flex: 3,
    },
    statNumber: {
      fontFamily: fonts.medium,
      fontSize: 15,
      color: `${colors.text}99`,
      flex: 2,
      textAlign: 'center',
    },
    statBarBackground: {
      flex: 8,
      borderRadius: 4,
      overflow: 'hidden',
      height: 8,
      alignSelf: 'center',
      flexDirection: 'row',
      backgroundColor: `${colors.text}20`,
    },
    infoHeader: {
      fontFamily: fonts.bold,
      fontSize: 14,
      color: colors.text,
      flex: 1,
      textAlign: 'left',
    },
    infoValue: {
      fontFamily: fonts.medium,
      fontSize: 15,
      color: `${colors.text}99`,
      flex: 3,
      textAlign: 'left',
      marginLeft: 10,
    },
    infoSubValue: {
      fontFamily: fonts.medium,
      fontSize: 15,
      color: `${colors.text}99`,
    },
    infoItem: {
      flexDirection: 'row',
      flex: 1,
      marginBottom: 8,
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ paddingHorizontal: 20, flex: 1 }}>
        <View style={{ paddingBottom: 16 }}>
          <Text style={styles.header}>Info</Text>
          <View>
            <View style={styles.infoItem}>
              <Text style={styles.infoHeader}>National</Text>
              <Text style={styles.infoValue}>{`#${leadingZeros(pokemon.number, 3)}`}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoHeader}>Species</Text>
              <Text style={styles.infoValue}>{pokemon.species}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoHeader}>Height</Text>
              <Text style={styles.infoValue}>{pokemon.height}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoHeader}>Weight</Text>
              <Text style={styles.infoValue}>{pokemon.weight}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoHeader}>Base Exp</Text>
              <Text style={styles.infoValue}>{pokemon.baseExperience}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoHeader}>Growth Rate</Text>
              <Text style={styles.infoValue}>{pokemon.growthRate}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoHeader}>Egg Steps</Text>
              <Text style={styles.infoValue}>{pokemon.eggCycles}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoHeader}>Egg Groups</Text>
              <Text style={styles.infoValue}>{pokemon.eggGroups}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoHeader}>Catch Rate</Text>
              <Text style={styles.infoValue}>{pokemon.catchRate}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoHeader}>Gender Rate</Text>
              <View style={styles.infoValue}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FontAwesome5
                    name="mars"
                    size={14}
                    style={{ width: 15, color: colors.male }} />
                  <Text style={styles.infoSubValue}>
                    {(pokemon.gender || {}).male}
                    %
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FontAwesome5
                    name="venus"
                    size={14}
                    style={{ width: 15, color: colors.female }} />
                  <Text style={styles.infoSubValue}>
                    {(pokemon.gender || {}).female}
                    %
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <Text style={styles.header}>Base Stats</Text>
          {stats.map((statTitle, index) => {
            const isTotal = statTitle === 'Total';
            const statValue = isTotal ? pokemon.baseStats.map((m) => m[0]).reduce((a, b) => a + b) : pokemon.baseStats[index][0];
            const statMin = isTotal ? 'Min' : pokemon.baseStats[index][1];
            const statMax = isTotal ? 'Max' : pokemon.baseStats[index][2];
            const statPercentage = statValue * 100 / (255 * (isTotal ? 6 : 1));

            return (
              <View
                key={statTitle}
                style={{ marginBottom: isTotal ? 0 : 12, flexDirection: 'row' }}>
                <Text style={styles.statHeader}>{statTitle}</Text>
                <Text style={styles.statNumber}>{statValue}</Text>
                <View style={[styles.statBarBackground, { opacity: isTotal ? 0 : 1 }]}>
                  <LinearGradient
                    style={{ width: `${statPercentage}%`, borderRadius: 4 }}
                    colors={gradientColors}
                    start={{ x: 0.05, y: 0.5 }}
                    end={{ x: 0.95, y: 0.5 }} />
                </View>
                <Text style={styles.statNumber}>{statMin}</Text>
                <Text style={styles.statNumber}>{statMax}</Text>
              </View>
            );
          }) }
          <Text style={styles.header}>Weaknesses</Text>
          <TypeChart types={pokemon.types} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

Stats.propTypes = { pokemon: PropTypes.objectOf(PropTypes.any).isRequired };

export default Stats;
