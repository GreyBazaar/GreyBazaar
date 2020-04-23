
import React, { Component } from 'react';
import { Button, Body, Input, Container, Content, Header, Item, Label, Title, Right, Left } from 'native-base';
import {
    StyleSheet, ScrollView, View, Text, StatusBar, TextInput, TouchableOpacity, KeyboardAvoidingView, Dimensions,
} from 'react-native';
import firebase from 'firebase'
import colors from '../../assets/colors'

export default class LoginScreen extends Component {
    constructor(props){
        super(props)
        this.state ={
            email : '' ,
            password : ''
        }
    }
    componentDidMount(){
        this.FirebaseIntialize()
    }
    FirebaseIntialize = () =>{
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
    login = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
          .then(
            () => this.props.navigation.navigate('ChoiceRoute'), console.log(this.state.email)
            //() => this.props.navigation.navigate('HomeRoute'), console.log(this.state.email)
          ).catch((e) => console.log(e))
      }
    render() {
        return (
            <Container style={styles.container}>

                <Header style={{ backgroundColor: colors.colorBlack }}>
                    <Body style={{ marginLeft: 40, }}>
                        <Title>Login </Title>
                    </Body>
                    <Right />
                </Header>

                <View style={styles.innerContainer}>

                    <TextInput
                        style={styles.inputBox}
                        underLineColorAndroid='#000000'
                        placeholderTextColor='rgba(0,0,0,0.4)'
                        placeholder="email-id"
                        keyboardType='email-address'
                        autoCapitalize='none'
                        onChangeText={(text) => this.setState({ email: text })}
                    />

                    <TextInput
                        style={styles.inputBox}
                        underLineColorAndroid='#000000'
                        placeholder="password"
                        placeholderTextColor='rgba(0,0,0,0.4)'
                        secureTextEntry={true}
                        autoCapitalize="none"
                        onChangeText={(text) => this.setState({ password: text })}
                    />

                    <TouchableOpacity onPress={() => this.login()}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Log In</Text>
                    </TouchableOpacity>


                    <Text style={styles.lastText}>
                        Don't have an account? {"\t\t"}

                        <Text
                            style={styles.signupText}
                            onPress={() => this.props.navigation.navigate('SignUpRoute')}>
                            Sign Up
                        </Text>
                    </Text>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({

    horizontalLine: {
        borderBottomColor: colors.colorBlack,
        borderColor: colors.colorRed,
        height: 0,
        width: 150,
        borderStyle: 'solid',
        margin: 10,
        borderBottomWidth: 1,
    },
    container: {
        // paddingTop: 20,
        flex: 1,
        backgroundColor: colors.colorShadow,
    },
    heading: {
        color: colors.colorBlack,
        fontSize: 26,
        marginBottom: 10
    },
    inputBox: {
        marginVertical: 14,
        paddingHorizontal: 16,
        width: 300,
        height: 50,
        backgroundColor: colors.colorShadow,
        fontSize: 16,
        // borderRadius: 25,
    },
    innerContainer: {
        padding: 10,
        margin: 20,
        borderRadius: 10,
        backgroundColor: colors.colorWhite,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText:
    {
        fontSize: 18,
        alignContent: 'center',
        justifyContent: 'center',
        color: colors.colorWhite,
        textAlign: 'center'
    },
    button:
    {
        paddingVertical: 15,
        paddingHorizontal: 15,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        width: 140,
        backgroundColor: colors.colorBlue,
    },
    signupText: {
        fontSize: 16,
        color: colors.colorBlue,
        textDecorationLine: 'underline',
    },
    lastText: {
        margin: 20,
        fontSize: 16,
    }
})
