import React from "react";
import {View,StyleSheet,TouchableOpacity,Text,FlatList} from "react-native";
import {ListItem,Icon} from 'react-native-elements';
import header from '../components/MyHeader'

export default class MyDonationScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            userId:  firebase.auth().currentUser.email,
            donorName:'',
            allDonations: []
        }
        this.requestRef = null
    }
    getAllDonations=()=>{
        this.requestRef = db.collections("All_Donations").where("Donor_ID","==",this.state.userId).get()
        .onSnapshot((snapshot)=>{
            var allDonations = snapshot.docs.map(document=>document.data())
            this.setState({
                allDonations:allDonations
            })
        })
    }
    keyExtractor = (item,index) =>{index.toString()}
    renderItem = ({item,i}) =>(
        <ListItem
        key={i}
        title={item.Book_Name}
        subtitle={"Request By:" + item.Requested_By + "\n Status:" + item.Request_Status}
        leftElement={<Icon name="book" type="font-awesome" color="#696969" />}
        titleStyle={{color:'black', fontWeight:"bold"}}
        rightElement={
            <TouchableOpacity style={StyleSheet.button}
            onPress={()=>{
                this.sendBook(item)
            }}><Text>Send Book</Text></TouchableOpacity>
        }
        bottomDivider/>
    )
    sendBook=(bookDetails)=>{
        if(bookDetails.Request_Status === "Book Sent"){
            var requestStatus = 'Donor Interested'
            db.collections("All_Donations").doc(bookDetails.doc_id).update({
                "Request_Status": "Donor Interested"
            })
            this.sendNotification(bookDetails,requestStatus)
        }
    }
    sendNotification=(bookDetails,requestStatus)=>{
        var requestId = bookDetails.Request_ID
        var donorId = bookDetails.Donor_ID
        db.collections("All_Notifications").where("Request_ID","==", requestId)
        .where("Donor_ID","==", donorId)
        .get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var message = ""
                if(requestStatus === "Book Sent"){
                    message = this.state.donorName+ "sent you book"
                }else{
                    message = this.state.donorName + "has shown interest in donating the book"
                }
                db.collections("All_Notifications").doc(doc.id).update({
                    "Message": message,
                    "Notification_Status": "unread",
                    "Date": firebase.firestore.FieldValue.serverTimestamp()
                })
            })
        })
    }
    render(){
        return(
            <View>
                <MyHeader title={"My Donations"} navigation={this.props.navigation}/>
                <View style={{flex:1}}>
                    {this.state.allDonations.lenght === 0
                    ?(<View><Text style={{fontSize:20}}>List of all Donations</Text></View>)
                    :(<FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.allDonations}
                    renderItem = {this.renderItem} />)}
                </View>
            </View>
        );
    }
}