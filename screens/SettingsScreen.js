import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, TextInput } from "react-native";
import header from '../components/MyHeader';
import db from '../config';
import firebase from 'firebase';

export default class SettingsScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            contact: '',
            docId: ''
        }
    }
    getUserDetails = () => {
        var user = firebase.auth().currentUser;
        var email = user.email;
        db.collection('users').where('Username', '===', email).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    var data = doc.data()
                    this.setState({
                        email: data.Username,
                        firstName: data.First_Name,
                        lastName: data.Last_Name,
                        address: data.Address,
                        contact: data.Mobile_Number,
                        docId: doc.id
                    })
                })
            })
    }
    updateUserDetails=()=>{
        db.collection('users').doc(this.state.docId).update({
            "First_Name": this.state.firstName,
            "Last_Name": this.state.lastName,
            "Address" : this.state.address,
            "contact" : this.state.contact
        })
        Alert.alert("Profile Updated");
    }
    componentDidMount() {
        this.getUserDetails()
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    maxLength={10}
                    onChangeText={(text) => {
                        this.setState({
                            firstName: text
                        })
                    }}

                    value={this.state.firstName} />
                <TextInput
                    placeholder="Last Name"
                    maxLength={10}
                    onChangeText={(text) => {
                        this.setState({
                            lastName: text
                        })
                    }}
                    value={this.state.lastName} />
                <TextInput
                    placeholder="Contact No"
                    keyboardType='numeric'
                    onChangeText={(text) => {
                        this.setState({
                            contact: text
                        })
                    }}
                    value={this.state.contact} />
                <TextInput
                    placeholder="Address"
                    multiline={true}
                    onChangeText={(text) => {
                        this.setState({
                            address: text
                        })
                    }}
                    value={this.state.address} />

                <TouchableOpacity style={styles.button}
                    onPress={() => {
                            this.updateUserDetails()
                    }}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        alignSelf: 'center',
        borderWidth: 1,
        width: '60%',
        height: 30
    },
    button: {
        width: '70%',
        alignSelf: 'center',
        alignItems: 'center',
        height: 30,
        borderWidth: 1
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})