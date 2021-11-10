import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PokemonScreen from '../screens/PokemonScreen';
import SearchScreen from '../screens/SearchScreen';
import {RootStackProps} from './StackRoutes';

const Stack = createStackNavigator<RootStackProps>();

const SearchRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'white'},
      }}>
      <Stack.Screen name="home" component={SearchScreen} />
      <Stack.Screen name="pokemon" component={PokemonScreen} />
    </Stack.Navigator>
  );
};

export default SearchRoutes;
