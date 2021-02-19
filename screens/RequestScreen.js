import React from "react";
import {View,StyleSheet,TouchableOpacity,TextInput} from "react-native";
import Header from '../components/MyHeader'
export default class RequestScreen extends React.Component{
    constructor(){
        super();
        this.state={
            bookName:'',
            reason:'',
            userID:firebase.auth().currentUser.email
        }
    }

    createUniqueId=()=>{
        return Math.random().toString(36).substring(7);
    }

    addRequest = (bookName,reason) =>{
        var userID = this.state.userID
        var randomRequestID = this.createUniqueId()
        db.colletions('Requested_Books').add({
            "User_ID": userID ,
            "Book_Name": bookName,
            "Reason_To_Request": reason,
            "Request_ID": randomRequestID

        })
        this.setState({
            bookName:'',
            reason:''
        })
    }
    render(){
        return(
            <View style={styles.container}>
                <MyHeader title={"Request Book"}/>
                <TextInput
                placeholder={"Book Name"}
                style={styles.input}
                onChangeText={(text)=>{
                    this.setState({
                        bookName:text
                    })
                }}/>
                <TextInput
                placeholder={"Reason For Request"}
                style={styles.input}
                onChangeText={(text)=>{
                    this.setState({
                        reason:text
                    })
                }}/>
                <TouchableOpacity style={styles.submit}>
                    <Text style={styles.submitText}
                    onPress={()=>{this.addRequest}}>Request</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})