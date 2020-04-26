import React from 'react'
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet} from 'react-native'
import colors from '../../assets/colors'
import firebase from 'firebase'

export default class Choice extends React.Component {
    componentDidMount(){
        const firebaseConfig = {
            apiKey: "AIzaSyD86qcj_Y7TebCE0ItFx3rbWk7Jt6hpOnk",
            authDomain: "greybazaar-99830.firebaseapp.com",
            databaseURL: "https://greybazaar-99830.firebaseio.com",
            projectId: "greybazaar-99830",
            storageBucket: "greybazaar-99830.appspot.com",
            messagingSenderId: "633758325063",
            appId: "1:633758325063:web:2c65acfd12dc333a04d462",
            measurementId: "G-LG0H64QJ41"
          };
          if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
    }
    render () {
        return(
            <View style = {styles.container}>
                <Text style = {styles.text1}>ARE YOU A</Text>
                <View style = {{flexDirection:'row', justifyContent:'space-evenly'}}>
                    <TouchableOpacity
                        style = {styles.button}
                        onPress = {() => this.props.navigation.navigate('LoginScreenBuyer')}
                    >
                        <Text style = {styles.text2}>BUYER</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style = {styles.button}
                        onPress = {() => this.props.navigation.navigate('LoginScreenSeller')}
                    >
                        <Text style = {styles.text2}>SELLER</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: "center",
        alignContent:'center'
    },
    text1: {
        fontSize: 35,
        textAlign: 'center',
        fontWeight: "bold",
        marginBottom: 30,
        color: colors.colorBlue

        
    },
    text2: {
        fontSize: 25,
        //textAlign: 'center',
        fontWeight: "bold",
        color: 'white'

        
    },
    button: {
        //marginHorizontal: 30,
        backgroundColor: colors.colorBlue,
        borderRadius: 8,
        height: 52,
        justifyContent:"center",
        alignItems:"center",
       width: 120,
       alignSelf: 'center',
       marginBottom: 20
       
    },


})