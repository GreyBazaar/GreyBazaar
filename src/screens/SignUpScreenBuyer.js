
import React, { Component } from 'react';
import { Button, Body, Input, Container, Content, Header, Item, Label, Title, Right, Left } from 'native-base';
import {
  SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TouchableOpacity, KeyboardAvoidingView, TextInput, Dimensions,
} from 'react-native';
import * as firebase from 'firebase/app'
import colors from '../../assets/colors'

class SignUpScreenBuyer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      pass: '',
      pass2: '',
      visible: true,
      error: '',
      email: '',
    }
  }
  

  signUp = () => {
    if (this.state.pass == this.state.pass2) {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass)
        .then((userCredentials) => {
          if (userCredentials.user) {
            userCredentials.user.updateProfile({
              buyer: true
            }).then((s) => {
              this.props.navigation.navigate('CompanyDetailsRoute',{
                type : 'Buyer'
              });
            })
          }
        })
        .catch(function (error) {
          alert(error.message);
        })
    }
    else {

      this.setState({
        error: 'Password didnt match',
        visible: true
      })
    }
  }


  render() {
    return (
      <Container style={styles.container}>
        <Header style={{ backgroundColor: colors.colorBlack }}>
          <Body style={{ marginLeft: 40 }}>
            <Title>SignUp as Buyer </Title>
          </Body>
          <Right />
        </Header>

        <View style={styles.innerContainer}>
          <Text style={styles.heading}>Sign Up</Text>

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
            placeholder="enter your password"
            placeholderTextColor='rgba(0,0,0,0.4)'
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={(text) => this.setState({ pass: text })}
          />
          <TextInput
            style={styles.inputBox}
            underLineColorAndroid='#000000'
            placeholder="re enter your password"
            placeholderTextColor='rgba(0,0,0,0.4)'
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={(text) => this.setState({ pass2: text })}
          />
          {
            this.state.visible ?
              <Text>{this.state.error}</Text>
              :
              null
          }
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.signUp()}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: "row", margin: 10, }}>
            <View style={styles.horizontalLine} />
            <Text> OR </Text>
            <View style={styles.horizontalLine} />
          </View>


          <Text style={styles.lastText}>
            Already have an account? {"\t\t"}

            <Text
              style={styles.loginText}
              onPress={() => this.props.navigation.navigate('LoginScreenBuyer')}>
              Login
                    </Text>


          </Text>
          {/* <Button
                    color="transparent"
                    title="Login "
                    onPress={() => this.props.navigation.navigate('LoginRoute')}
                /> */}
        </View>
      </Container>


    )
  }
}


export default SignUpScreenBuyer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
    // alignContent:'center',
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
  buttonText:
  {
    fontSize: 18,
    alignContent: 'center',
    justifyContent: 'center',
    color: colors.colorWhite,
    textAlign: 'center'
  },
  horizontalLine: {
    borderBottomColor: colors.colorBlack,
    borderColor: colors.colorBlack,
    height: 0,
    width: 150,
    borderStyle: 'solid',
    margin: 10,
    borderBottomWidth: 1,
  },
  innerContainer: {
    // padding:10,
    margin: 20,
    paddingTop: 16,
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.colorWhite,
    // alignContent:'center',
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf:'center',
  },
  button:
  {
    paddingVertical: 15,
    paddingHorizontal: 15,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    width: 140,
    backgroundColor: colors.colorBlue,
  },
  loginText: {
    fontSize: 16,
    color: colors.colorBlack,
    textDecorationLine: 'underline',
  },
  lastText: {
    margin: 20,
    fontSize: 16,
  }
})
