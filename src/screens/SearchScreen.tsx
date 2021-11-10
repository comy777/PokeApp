import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  Dimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import PokeCardComponent from '../components/PokeCardComponent';
import SearchComponent from '../components/SearchComponent';
import usePokemonSearch from '../hooks/useSearchPokemon';
import {appTheme} from '../theme/appTheme';
import LoadingComponent from '../components/LoadingComponent';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';

const {width: screenWidth} = Dimensions.get('window');

const SearchScreen = () => {
  const {top} = useSafeAreaInsets();
  const {pokemons, isFetching} = usePokemonSearch();
  const [pokemonFiltrados, setPokemonFiltrados] = useState<SimplePokemon[]>([]);
  const [term, setTerm] = useState('');
  useEffect(() => {
    if (term.length === 0) {
      return setPokemonFiltrados([]);
    }
    if (isNaN(Number(term))) {
      setPokemonFiltrados(
        pokemons.filter(poke =>
          poke.name.toLocaleLowerCase().includes(term.toLocaleLowerCase()),
        ),
      );
    } else {
      const pokemonById = pokemons.find(poke => poke.id === term);
      setPokemonFiltrados(pokemonById ? [pokemonById] : []);
    }
  }, [term]);
  if (isFetching) return <LoadingComponent />;
  return (
    <View
      style={{
        ...styles.container,
      }}>
      <SearchComponent
        onDebounce={value => setTerm(value)}
        style={{
          position: 'absolute',
          zIndex: 999,
          width: screenWidth - 40,
          top: Platform.OS === 'ios' ? top : top + 10,
        }}
      />
      <FlatList
        ListHeaderComponent={
          <Text
            style={{
              ...appTheme.title,
              ...appTheme.globalMargin,
              paddingBottom: 10,
              marginTop: Platform.OS === 'ios' ? top + 60 : top + 80,
            }}>
            {term}
          </Text>
        }
        data={pokemonFiltrados}
        keyExtractor={item => item.id}
        renderItem={({item}) => <PokeCardComponent pokemon={item} />}
        showsVerticalScrollIndicator={false}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
});

export default SearchScreen;
