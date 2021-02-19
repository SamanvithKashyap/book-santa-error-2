import React from "react";
import { View, StyleSheet, TouchableOpacity, TextInput, Alert, Text, Image, Modal, KeyboardAvoidingView, ScrollView } from "react-native";
import db from '../config';
import firebase from 'firebase';

export default class WelcomeScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      isModalVisible: 'false',
      firstName: '',
      lastName: '',
      address: '',
      contact: ''

    }

  }
  userSignUp = async (email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return (Alert.alert("Password Deosnt match"))
    }
    else {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((response) => {
          return (
            Alert.alert("User Added Successfully!")
          )
        })
        .catch((error) => {
          var errorCode = error.code
          var errorMessage = error.message
          return (
            Alert.alert(errorMessage)
          );

        })
      db.collection('users').add({
        First_Name: this.state.firstName,
        Last_Name: this.state.lastName,
        Mobile_Number: this.state.contact,
        Address: this.state.address,
        Username: this.state.email

      })
    }

  }
  userLogin = async (email, password) => {
    console.log('user login')
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() =>  this.props.navigation.navigate("DonateScreen")
      )
      .catch((error) => {
        alert('user login', error)
        var errorCode = error.code
        var errorMessage = error.message
        return (
          Alert.alert(errorMessage)
        );
      })
  }
  showModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}
      >
        <View style={styles.modalContainer}>
          <View>{this.isModalVisible}</View>
          <ScrollView style={{ width: '100%' }}>
            <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
              <Text
                style={styles.modalTitle}
              >Registration</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder={"First Name"}
                maxLength={8}
                onChangeText={(text) => {
                  this.setState({
                    firstName: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={"Last Name"}
                maxLength={8}
                onChangeText={(text) => {
                  this.setState({
                    lastName: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={"Contact"}
                maxLength={10}
                keyboardType={'numeric'}
                onChangeText={(text) => {
                  this.setState({
                    contact: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={"Address"}
                multiline={true}
                onChangeText={(text) => {
                  this.setState({
                    address: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={"Email"}
                keyboardType={'email-address'}
                onChangeText={(text) => {
                  this.setState({
                    emailId: text
                  })
                }}
              /><TextInput
                style={styles.formTextInput}
                placeholder={"Password"}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    password: text
                  })
                }}
              /><TextInput
                style={styles.formTextInput}
                placeholder={"Confrim Password"}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    confirmPassword: text
                  })
                }}
              />
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={() =>
                    this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                  }
                >
                  <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => this.setState({ "isModalVisible": false })}
                >
                  <Text style={{ color: '#ff5722' }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
          {
            this.showModal()
          }
        </View>

        <View><Text style={styles.santa}>Book Santa</Text></View>
        <Image source={require("../assets/image.webp")} style={{ width: 200, height: 200, alignSelf: "center" }} />

        <TextInput style={styles.LoginBox}
          onChangeText={(text) => {
            this.setState({
              email: text
            })
          }}
          placeholder='abc@example.com'
          keyboardType="email-address" />


        <TextInput style={styles.LoginBox}
          onChangeText={(text) => {
            this.setState({
              password: text
            })
          }}
          placeholder='Enter Password'
          secureTextEntry={true} />


<TouchableOpacity
           style={styles.LoginButton}
           onPress = {()=>{
             this.userLogin(this.state.email, this.state.password)
           }}
           >
           <Text style={styles.buttonText}>Login</Text>
         </TouchableOpacity>

        <TouchableOpacity
           style={styles.LoginButton}
           onPress={()=>this.setState({ isModalVisible:true})}
           >
           <Text style={styles.buttonText}>SignUp</Text>
         </TouchableOpacity>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8BE85',
    alignItems: 'center',
    justifyContent: 'center'
  },
  LoginBox: {
    borderWidth: 1,
    alignItems: 'center',
    width: '30%',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 20,
    height: '20%',
    fontSize: 20
  },
  LoginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '10%',
    alignSelf: 'center',
    borderWidth: 0.2,
    marginTop: 20,
    padding: 5
  },
  LoginText: {
    fontSize: 20
  },
  santa: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  KeyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalTitle: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 30,
    color: '#ff5722',
    margin: 50
  },
  modalContainer: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ffff",
    marginRight: 30,
    marginLeft: 30,
    marginTop: 80,
    marginBottom: 80,
  },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: 'center',
    borderColor: '#ffab91',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10
  },
  registerButton: {
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30
  },
  registerButtonText: {
    color: '#ff5722',
    fontSize: 15,
    fontWeight: 'bold'
  },
  cancelButton: {
    width: 200,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },

  button: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: "#ff9800",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
    padding: 10
  },
  buttonText: {
    color: '#ffff',
    fontWeight: '200',
    fontSize: 20
  }
})