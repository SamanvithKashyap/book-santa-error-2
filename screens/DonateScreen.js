import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, FlatList } from "react-native";
import ReciverDetailsScreen from "./ReciverDetailsScreen";
import firebase from 'firebase';

export default class DonateScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            requestedBookList: []
        }
        this.requestRef = null;
    }

    getRequestedBookList = () => {
        this.requestRef = db.collection('Requested_Books')
            .onSnapshot((snapshot) => {
                var requestedBookList = snapshot.docs.map(document => { document.data() })
                this.setState({
                    requestedBookList: requestedBookList
                })
            })
    }
    keyExtractor = (item, index) => index.toString()
    renderItem = ({ item, i }) => {
        return (
            <ListItem
                key={i}
                title={item.Book_Name}
                subtitle={item.Reason_To_Request}
                titleStyle={{ fontSize: 20, fontWeight: "bold", color: 'black' }}
                rightElement={
                    <TouchableOpacity style={styles.button}
                    onPress={()=>{
                        this.props.navigation.navigate('ReciverDetailsScreen',{'details': item})
                    }}>
                        <Text>View</Text>
                    </TouchableOpacity>
                }
                bottomDivider />
        )
    }
    render() {

        return (
            <View style={{ flex: 1 }}>
                <MyHeader title={"Donate Books"} />
                <View style={{ flex: 1 }}>
                    {this.state.requestedBookList === 0 ?
                        (<View style={{ flex: 1 }}><Text style={{ fontSize: 25, fontWeight: 'bold' }}>List Of All Books</Text></View>) :
                        (<FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.requestedBookList}
                            renderItem={this.renderItem} />)}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        height: '30%'
    }
})