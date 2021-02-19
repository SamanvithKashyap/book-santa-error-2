import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './AppTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';
import SettingsScreen from '../screens/SettingsScreen'
import MyDonationsScreen from '../screens/MyDonationsScreen'
import NotificationScreen from '../screens/NotificationsScreen'

export const AppDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: AppTabNavigator
    },
    Settings:{
        screen: SettingsScreen
    },
    MyDonations:{
        screen: MyDonationsScreen
    },
    Notifications:{
        screen: NotificationScreen
    }
},
    {
        contentComponent:CustomSideBarMenu
    },
    {
        initialRouteName: 'Home'
    }
)