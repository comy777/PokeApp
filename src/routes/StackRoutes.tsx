import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import HomeScreen from '../screens/HomeScreen';
import PokemonScreen from '../screens/PokemonScreen';

export type RootStackProps = {
  home: undefined;
  pokemon: {simplePokemon: SimplePokemon; color: string};
};

const Stack = createStackNavigator<RootStackProps>();

const StackRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'white'},
      }}>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="pokemon" component={PokemonScreen} />
    </Stack.Navigator>
  );
};

export default StackRoutes;
