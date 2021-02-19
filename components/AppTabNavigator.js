import React from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Alert, Text, Image, Modal, KeyboardAvoidingView, ScrollView } from "react-native";
import {createBottomTabNavigator} from 'react-navigation-tabs';

import RequestScreen from '../screens/RequestScreen';
import DonateScreen from '../screens/DonateScreen';

export const AppTabNavigator = createBottomTabNavigator({
    BookDonate:{
        screen: DonateScreen,
        navigationOptions:{
            tabBarIcon:(
                <Image source={require('../assets/request-list.png')} style={{width:20,height:20}}/>
            ),
            tabBarLabel: "Donate Book"
        }
    },
    BookRequest:{
        screen: RequestScreen,
        navigationOptions:{
            tabBarIcon:(<Image source={require('../assets/request-book.png')} style={{width:20,height:20}} />),
            tabBarLabel: "Request Book"
        }
    }
})