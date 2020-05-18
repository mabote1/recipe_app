import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './HomeScreen';
import AddRecipe from './AddRecipe';
import ViewRecipes from './ViewRecipes';

const Stack = createStackNavigator();

export default class Nav extends Component {
    render() {
        return (
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Add Recipe" component={AddRecipe} />
                <Stack.Screen name="View Recipes" component={ViewRecipes}/>
              </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
