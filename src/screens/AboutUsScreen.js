import React, { Component } from "react";
import { ImageBackground, View, StatusBar, Dimensions, Platform, StyleSheet } from "react-native";
import { Container, Button, H3, Text } from "native-base";

const deviceHeight = Dimensions.get("window").height;


export default class DrawerScreen3 extends Component {
  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" androidStatusBarColor='#000000' />

          <View style={styles.container}>
            <H3 style={styles.text}>About Us Screen</H3>
            <Text style={{fontSize:30}}>Created By</Text>
            <Text style={{fontSize:30}}>Manav Jain</Text>
            <Text style={{fontSize:30}}>Simrn Gupta</Text>
            <Text style={{fontSize:30}}>Nirali Parekh</Text>
            <Text style={{fontSize:30 , paddingTop:10}}>Contacts Us </Text>
            <Text style={{fontSize:30}}>greybazaar123@gmail.com</Text>
            
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
    justifyContent:'center',
    backgroundColor: "transparent",
  },
  text: {
    color: "#D8D8D8",
  }
})
