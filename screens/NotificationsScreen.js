import React from "react";
import {View,StyleSheet,TouchableOpacity,Text,FlatList} from "react-native";
import {ListItem} from 'react-native-elements'
import header from '../components/MyHeader'

export default class NotificationScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
                userId: firebase.auth().currentUser.email,
                allNotifications: []
        }
        this.notificationRef = null
    }
    getNotifications=()=>{
        this.notificationRef = db.collection("All_Notifications").where("Notification_Status","==", "unread")
        .where("Targeted_User-ID",'==',this.state.userId)
        .onSnapshot((snapshot)=>{
            var allNotifications = []
            snapshot.docs.map((doc)=>{
                var notifications = doc.data()
                notification["doc_id"] = doc.id
                allNotifications.push(notifications)
            })
            this.setState({
                allNotifications: allNotifications
            })
        })
    }
    componentDidMount(){
        this.getNotifications()
    }
    keyExtractor = (item,index) =>{index.toString()}
    renderItem = ({item,index}) =>{
        return (
          <ListItem
            key={index}
            leftElement={<Icon name="book" type="font-awesome" color ='#696969'/>}
            title={item.book_name}
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            subtitle={item.message}
            bottomDivider
          />
        )
   }
    render(){
        return(
            <View>
            <View style={{flex:1}}>
              <MyHeader title={"Notifications"} navigation={this.props.navigation}/>
            </View>
            <View>
              {
                this.state.allNotifications.length === 0
                ?(
                  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontSize:25}}>You have no notifications</Text>
                  </View>
                )
                :(
                  <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.allNotifications}
                    renderItem={this.renderItem}
                  />
                )
              }
            </View>
          </View>
        );
    }

}
