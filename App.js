/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainScreen from './components/MainScreen';
import ConnectionScreen from './components/ConnectionScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const App: () => React$Node = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Devices') {
              iconName = focused ? 'devices' : 'devices';
            } else if (route.name === 'Connection') {
              iconName = focused ? 'rss-feed' : 'rss-feed';
            }
            return <MaterialIcons name={iconName} size={30} color="#900" />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#900',
          inactiveTintColor: 'black',
          labelStyle: {
            fontSize: 15,
            margin: 0,
            padding: 0,
          },
          style: {
            height: 75,
            paddingBottom: 10,
            paddingTop: 10,
          },
        }}>
        <Tab.Screen name="Devices" component={MainScreen} />
        <Tab.Screen name="Connection" component={ConnectionScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
