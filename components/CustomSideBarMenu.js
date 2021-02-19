import React from 'react';
import {StyleSheet,View,Text,TouchableOpacity} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import firebase from 'firebase';

export default class CustomSideBarMenu extends React.Component{
    render(){
        return(
            <View style={{flex:1}}>
                <View style={StyleSheet.drawerItemContainer}>
                    <DrawerItems {...this.props}/>
                </View>
                <View style = {styles.container}>
                    <TouchableOpacity style={StyleSheet.logoutButton}
                    onPress={()=>{
                        this.props.navigation.navigate('WelcomeScreen')
                        firebase.auth().signOut();
                    }}>
                        <Text>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
}) 