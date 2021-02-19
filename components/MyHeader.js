import {React} from 'react';
import {Header,Icon,Badge} from 'react-native-elements';
import {StyleSheet,View,TouchableOpacity,Text} from 'react-native'
import NotificationScreen from '../screens/NotificationsScreen'
import { Component } from 'react';
import db from '../config'


export default class MyHeader extends Component{
    constructor(props){
        super(props)
        this.state={
            value:''
        }
    }
    getNumberOfUnreadNotifications(){
        db.collection("All_Notifications").where("Notification_Status","==","unread")
        .onSnapshot((snapshot)=>{
            var unreadNotifications = snapshot.docs.map((doc)=> doc.data())
            this.setState({
                value:unreadNotifications.length
            })
        })
    }
    componentDidMount(){
        this.getNumberOfUnreadNotifications()
    }
    BellIconWithBadge=()=>{
        return(
            <View>
                <Icon name="bell" type="font-awesome" color="#696969" size={25} 
        onPress={()=> props.navigation.navigate("NotificationScreen")}/>
        <Badge value={this.state.value}
        containerStyle={{position:'absolute',top:-4,right:-4}}/>
            </View>
        )
    }

    render(){
        return(
            <Header 
            leftComponent={<Icon name="Bars" type="font-awesome" color="#696969" 
            onPress={()=>props.navigation.toggleDrawer()}/>}
            centerComponent={{text: props.title,style:styles.header}} backgroundColor={"grey"}
            rightComponent={<this.BellIconWithBadge {...this.props}/>}
            backgroundColor="blue"
            />
        )
    }
}

 const styles = StyleSheet.create({
header:{
    fontSize:30
}
})