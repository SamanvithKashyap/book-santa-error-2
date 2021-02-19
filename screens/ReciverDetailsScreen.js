import React from 'react';
import {View,StyleSheet,TouchableOpacity,TextInput,Text} from "react-native";
import {Card} from 'react-native-elements';
import header from '../components/MyHeader'

export default class ReciverDetailsScreen extends React.Component {
    constructor(props){
        super(props);
        this.setState={
            userId : firebase.auth().currentUser.email,
            reciverId : this.props.navigation.getParam('details')['User_ID'],
            requestId: this.props.navigation.getParam('details')['Request_ID'],
            bookName: this.props.navigation.getParam('details')['Book_Name'],
            reasonToRequest: this.props.navigation.getParam('details')['Reason_To_Request'],
            reciverName: '',
            reciverContact:'',
            reciverAddress:'',
            reciverRequestDocId:''

        }
    }
    getReciverDetails(){
        db.collection('users').where('Username','==',this.state.reciverId).get()
        .then(snapshot=>{
            snaapshot.forEach(doc=>{
                this.setState({
                    reciverName: doc.data().First_Name,
                    reciverContact: doc.data().contact,
                    reciverAddress: doc.darta().address
                })
            })
        })
        db.collection('Requested_Books').where('Request_ID','==', this.state.requestId).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                    reciverRequestDocId:doc.id
                })
            })
        })
    }

    updateBookStatus=()=>{
      db.collection('All_Donations').add({
        "Book_Name": this.state.bookName,
        "Donor_ID": this.state.userId,
        "Request_ID": this.state.reciverId,
        "Requested_By": this.state.reciverName,
        "Request_Status":"Donor Interested"
      })
    }
    addNotification=()=>{
      var message = this.state.userId + "has shown interest in donating the book"
      db.collection("All_Notifications").add({
        "Targeted_User-ID":this.state.reciverId,
        "Donot_ID":this.state.userId,
        "Request_ID":this.state.requestId,
        "Book_Name":this.state.bookName,
        "Date":firebase.firestore.FieldValue.serverTimestamp(),
        "Notification_Status":"unread",
        "Message": message

      })
    }

    componentDidMount(){
      this.getReciverDetails()
      this.getReciverDetails(this.state.userId)
    }
    render(){
        return(
             <View style={styles.container}>
            <View style={{flex:0.1}}>
              <MyHeader
                leftComponent ={<Icon name='arrow-left' type='feather' color='#696969'  onPress={() => this.props.navigation.goBack()}/>}
                centerComponent={{ text:"Donate Books", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
                backgroundColor = "#eaf8fe"
              />
            </View>
            <View style={{flex:0.3}}>
              <Card
                  title={"Book Information"}
                  titleStyle= {{fontSize : 20}}
                >
                <Card >
                  <Text style={{fontWeight:'bold'}}>Name : {this.state.bookName}</Text>
                </Card>
                <Card>
                  <Text style={{fontWeight:'bold'}}>Reason : {this.state.reason_for_requesting}</Text>
                </Card>
              </Card>
            </View>
            <View style={{flex:0.3}}>
              <Card
                title={"Reciever Information"}
                titleStyle= {{fontSize : 20}}
                >
                <Card>
                  <Text style={{fontWeight:'bold'}}>Name: {this.state.recieverName}</Text>
                </Card>
                <Card>
                  <Text style={{fontWeight:'bold'}}>Contact: {this.state.recieverContact}</Text>
                </Card>
                <Card>
                  <Text style={{fontWeight:'bold'}}>Address: {this.state.recieverAddress}</Text>
                </Card>
              </Card>
            </View>
            <View style={styles.buttonContainer}>
              {
                this.state.recieverId !== this.state.userId
                ?(
                  <TouchableOpacity
                      style={styles.button}
                      onPress={()=>{
                        this.updateBookStatus()
                        this.addNotification()
                        this.props.navigation.navigate('MyDonations')
                      }}>
                    <Text>I want to Donate</Text>
                  </TouchableOpacity>
                )
                : null
              }
            </View>
          </View>
        )
      }
    
    }

    
const styles = StyleSheet.create({
    container: {
      flex:1,
    },
    buttonContainer : {
      flex:0.3,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
      width:200,
      height:50,
      justifyContent:'center',
      alignItems : 'center',
      borderRadius: 10,
      backgroundColor: 'orange',
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       },
      elevation : 16
    }
  })