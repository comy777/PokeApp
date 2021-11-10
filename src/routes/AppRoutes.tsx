import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import StackRoutes from './StackRoutes';
import SearchScreen from '../screens/SearchScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchRoutes from './SearchStack';

const Tab = createMaterialBottomTabNavigator();

const AppRoutes = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        barStyle={{
          borderWidth: 0,
          elevation: 0,
          position: 'absolute',
          backgroundColor: 'rgba(255,255,255,0.82)',
        }}
        activeColor="#5856D6">
        <Tab.Screen
          name="home-tab"
          component={StackRoutes}
          options={{
            tabBarLabel: 'Listado',
            tabBarIcon: ({color}) => (
              <Icon name="list-outline" color={color} size={25} />
            ),
          }}
        />
        <Tab.Screen
          name="search"
          component={SearchRoutes}
          options={{
            tabBarLabel: 'Buscar',
            tabBarIcon: ({color}) => (
              <Icon name="search-outline" color={color} size={25} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
