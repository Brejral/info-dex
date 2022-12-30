import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useTheme } from '../../providers';

/* eslint-disable no-nested-ternary */

const Evolutions = ({ pokemon, pokedexData }) => {
  const navigation = useNavigation();
  const { colors, fonts } = useTheme();
  const firstType = pokemon.types[0].toLowerCase();
  const typeColor = colors[firstType];

  if (!pokemon.evolutions.length && !pokemon.deevolutions.length) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 50 }}>
        <Text style={{ fontFamily: fonts.bold, color: `${colors.text}99` }}>
          {pokemon.name}
          {' '}
          does not evolve
        </Text>
      </View>
    );
  }

  let evolutions = [];
  if (pokemon.deevolutions.length) {
    const { number, formName } = pokemon.deevolutions[0];
    const deevolution = pokedexData[number];
    const deevolutionForm = formName ? { ...deevolution, ...deevolution.forms.find((x) => x.formName === formName) } : { ...deevolution, ...deevolution.forms[0] };
    const evolution = deevolutionForm.evolutions.find((x) => x.formName === pokemon.formName && x.number === pokemon.number) || deevolutionForm.evolutions.find((x) => !x.formName && x.number === pokemon.number);
    const evolutionPokemon = pokedexData[evolution.number];
    const evolutionPokemonForm = evolution.formName ? { ...evolutionPokemon, ...evolutionPokemon.forms.find((x) => x.formName === evolution.formName) } : { ...evolutionPokemon, ...evolutionPokemon.forms[0] };
    evolutions.push({
      deevolution,
      deevolutionForm,
      method: evolution.method,
      evolution: evolutionPokemon,
      evolutionForm: evolutionPokemonForm,
    });
    if (deevolutionForm.deevolutions.length) {
      const subDeevolution = pokedexData[deevolutionForm.deevolutions[0].number];
      const subDeevolutionForm = formName ? { ...subDeevolution, ...subDeevolution.forms.find((x) => x.formName === deevolutionForm.deevolutions[0].formName) } : { ...subDeevolution, ...subDeevolution.forms[0] };
      const subEvolution = subDeevolution.evolutions.find((x) => x.formName === deevolutionForm.formName && x.number === deevolutionForm.number) || subDeevolution.evolutions.find((x) => !x.formName && x.number === deevolutionForm.number);
      const subEvolutionPokemon = pokedexData[subEvolution.number];
      const subEvolutionPokemonForm = subEvolution.formName ? { ...subEvolutionPokemon, ...subEvolutionPokemon.forms.find((x) => x.formName === subEvolution.formName) } : { ...subEvolutionPokemon, ...subEvolutionPokemon.forms[0] };
      evolutions = [
        {
          deevolution: subDeevolution,
          deevolutionForm: subDeevolutionForm,
          method: subEvolution.method,
          evolution: subEvolutionPokemon,
          evolutionForm: subEvolutionPokemonForm,
        },
        ...evolutions,
      ];
    }
  }
  if (pokemon.evolutions.length) {
    for (let i = 0; i < pokemon.evolutions.length; i += 1) {
      const { number, formName, method } = pokemon.evolutions[i];
      const evolutionPokemon = pokedexData[number];
      const evolutionPokemonForm = formName ? { ...evolutionPokemon, ...evolutionPokemon.forms.find((x) => x.formName === formName) } : { ...evolutionPokemon, ...evolutionPokemon.forms[0] };
      evolutions.push({
        deevolution: pokedexData[pokemon.number],
        deevolutionForm: pokemon,
        method,
        evolution: evolutionPokemon,
        evolutionForm: evolutionPokemonForm,
      });
      if (evolutionPokemonForm.evolutions.length) {
        for (let j = 0; j < evolutionPokemonForm.evolutions.length; j += 1) {
          const subEvolution = evolutionPokemonForm.evolutions[j];
          const subEvolutionPokemon = pokedexData[subEvolution.number];
          const subEvolutionPokemonForm = subEvolution.formName ? { ...subEvolutionPokemon, ...subEvolutionPokemon.forms.find((x) => x.formName === subEvolution.formName) } : { ...subEvolutionPokemon, ...subEvolutionPokemon.forms[0] };
          evolutions.push({
            deevolution: evolutionPokemon,
            deevolutionForm: evolutionPokemonForm,
            method: subEvolution.method,
            evolution: subEvolutionPokemon,
            evolutionForm: subEvolutionPokemonForm,
          });
        }
      }
    }
  }

  const styles = StyleSheet.create({
    header: {
      color: colors[firstType],
      fontFamily: fonts.bold,
      marginVertical: 16,
      fontSize: 24,
    },
    stageView: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    stageImage: {
      height: 80,
      width: 100,
      marginBottom: 5,
    },
    stageText: {
      fontFamily: fonts.bold,
      color: typeColor,
      fontSize: 14,
      textAlign: 'center',
    },
    method: {
      flex: 1,
      fontFamily: fonts.bold,
      color: `${colors.text}99`,
      fontSize: 12,
      flexWrap: 'wrap',
      textAlign: 'center',
      marginHorizontal: 10,
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ paddingHorizontal: 20, flex: 1 }}>
        <Text style={styles.header}>Evolutions</Text>
        {evolutions.map((x, index) => (
          <View
            key={index.toString()}
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30, marginTop: 10 }}>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor={colors.transparent}
              style={{ }}
              onPress={() => { if (pokemon.number !== x.deevolution.number) navigation.push('Pokemon', { pokemon: x.deevolution, formName: x.deevolutionForm.formName }); }}>
              <View style={styles.stageView}>
                <Image
                  style={styles.stageImage}
                  resizeMode="contain"
                  uri={x.deevolutionForm.image} />
                <Text style={styles.stageText}>{x.deevolutionForm.name}</Text>
              </View>
            </TouchableHighlight>
            <Text style={styles.method}>{x.method}</Text>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor={colors.transparent}
              style={{ }}
              onPress={() => { if (pokemon.number !== x.evolution.number) navigation.push('Pokemon', { pokemon: x.evolution, formName: x.evolutionForm.formName }); }}>
              <View style={styles.stageView}>
                <Image
                  style={styles.stageImage}
                  resizeMode="contain"
                  uri={x.evolutionForm.image} />
                <Text style={styles.stageText}>{x.evolutionForm.name}</Text>
              </View>
            </TouchableHighlight>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

Evolutions.propTypes = {
  pokemon: PropTypes.objectOf(PropTypes.any).isRequired,
  pokedexData: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Evolutions;
