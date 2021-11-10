import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackProps} from '../routes/AppRoutes';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FadeInImage} from '../components/FadeInImage';
import useGetPokemon from '../hooks/useGetPokemon';
import PokemonDetails from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackProps, 'pokemon'> {}

const PokemonScreen = ({route, navigation}: Props) => {
  const {color, simplePokemon} = route.params;
  const {id, name, picture} = simplePokemon;
  const {top} = useSafeAreaInsets();
  const {getPokemon, pokemonData, isLoading} = useGetPokemon(id);
  useEffect(() => {
    getPokemon();
  }, []);
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          ...styles.headerContainer,
          backgroundColor: color,
        }}>
        <TouchableOpacity
          style={{...styles.backBtn, top: top + 5}}
          onPress={() => navigation.pop()}>
          <Icon name="arrow-back-outline" color="white" size={35} />
        </TouchableOpacity>
        <Text
          style={{
            ...styles.pokemonName,
            top: top + 40,
          }}>
          {name + '\n'} #{id}
        </Text>
        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={styles.pokebola}
        />
        <FadeInImage uri={picture} style={styles.pokemonImage} />
      </View>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={color} size={50} />
        </View>
      ) : (
        <PokemonDetails pokemon={pokemonData} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
  },
  backBtn: {
    position: 'absolute',
    left: 20,
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokebola: {
    height: 250,
    width: 250,
    bottom: -18,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PokemonScreen;
