import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import ImageColors from 'react-native-image-colors';
import {FadeInImage} from './FadeInImage';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {StackScreenProps} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/core';

interface Props {
  pokemon: SimplePokemon;
}

const {width: widthScreen} = Dimensions.get('window');

const PokeCardComponent = ({pokemon}: Props) => {
  const navigation = useNavigation();
  const [colors, setColors] = useState('grey');
  const isMounted = useRef(true);
  const result = async () => {
    const res = await ImageColors.getColors(pokemon.picture);
    res.platform === 'ios'
      ? setColors(res.background || 'grey')
      : setColors(res.dominant || 'grey');
  };
  useEffect(() => {
    if (!isMounted.current) return;
    result();
    return () => {
      isMounted.current = false;
    };
  }, []);
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate('pokemon', {simplePokemon: pokemon, color: colors})
      }>
      <View
        style={{
          ...styles.cardContainer,
          width: widthScreen * 0.4,
          backgroundColor: colors,
        }}>
        <View>
          <Text style={styles.name}>
            {pokemon.name} {`\n#` + pokemon.id}
          </Text>
        </View>
        <View style={styles.pokebolaContainer}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokebola}
          />
        </View>
        <FadeInImage uri={pokemon.picture} style={styles.pokemonImage} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    textShadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10,
  },
  pokebola: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -25,
    bottom: -25,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -8,
    bottom: -5,
  },
  pokebolaContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    opacity: 0.5,
    overflow: 'hidden',
  },
});

export default PokeCardComponent;
