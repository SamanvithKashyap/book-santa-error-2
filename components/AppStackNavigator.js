import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import ReciverDetailsScreen from '../screens/ReciverDetailsScreen';
import DonateScreen from '../screens/DonateScreen';

export const AppStackNavigator = createStackNavigator({
    BookDonate:{
        screen: DonateScreen,
        navigationOptions:{
            headerShown: false
        }
    },
    ReciverDetails :{
        screen: ReciverDetailsScreen,
        navigationOptions:{
            headerShown: false
        }
    }
},
{initialRouteName:'BookDonate'})