import React from 'react';
import {View, Text, Image, FlatList, ActivityIndicator} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {appTheme} from '../theme/appTheme';
import usePokemonPagination from '../hooks/usePokemonPagination';
import PokeCardComponent from '../components/PokeCardComponent';

const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {isLoading, pokemons, loadPokemons} = usePokemonPagination();
  if (isLoading) return <ActivityIndicator color="teal" size={20} />;
  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={appTheme.pokebolaBG}
      />
      <View style={{alignItems: 'center'}}>
        <FlatList
          ListHeaderComponent={
            <Text
              style={{
                ...appTheme.title,
                top: top + 20,
                ...appTheme.globalMargin,
                marginBottom: top + 20,
                paddingBottom: 10,
              }}>
              Pokedex
            </Text>
          }
          data={pokemons}
          keyExtractor={item => item.id}
          renderItem={({item}) => <PokeCardComponent pokemon={item} />}
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            <ActivityIndicator style={{height: 100}} color="teal" size={20} />
          }
          showsVerticalScrollIndicator={false}
          numColumns={2}
        />
      </View>
    </>
  );
};

export default HomeScreen;
