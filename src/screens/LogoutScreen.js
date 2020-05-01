import React, { Component } from "react";
import { ImageBackground, View, StatusBar, Dimensions, Platform, StyleSheet , TouchableOpacity } from "react-native";
import { Container, Button, H3, Text } from "native-base";
import auth from '@react-native-firebase/auth'
import colors from '../../assets/colors'

const deviceHeight = Dimensions.get("window").height;


export default class LogoutScreen extends Component {
  SignOut = async() => {
    console.log('Sign Out')
    await auth().signOut()
    this.props.navigation.navigate('LoginRoute')
  }
  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" androidStatusBarColor='#000000' />
        <View style={styles.container}>
          <H3 style={styles.text}>LogOut Screen</H3>
          <TouchableOpacity onPress={() => this.SignOut()}
            style={styles.button}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </View>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    width: null,
    height: null
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "transparent",
  },
  text: {
    color: "#D8D8D8",
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
  buttonText:
    {
        fontSize: 18,
        alignContent: 'center',
        justifyContent: 'center',
        color: colors.colorWhite,
        textAlign: 'center'
    },
})
