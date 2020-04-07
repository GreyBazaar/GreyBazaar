import React, { Component } from "react";
import { ImageBackground, View, StatusBar, Dimensions, Platform, StyleSheet } from "react-native";
import { Container, Button, H3, Text,  Header, Left, Right, Body, Title, } from "native-base";
import colors from '../../assets/colors'

const deviceHeight = Dimensions.get("window").height;


export default class ShareAppScreen extends Component {
  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" androidStatusBarColor='#000000' />

        <Header style={{ backgroundColor: colors.colorBlack }}>
          <Body style={{ marginLeft: 40, }}>
            <Title>Share App </Title>
          </Body>
          <Right />
        </Header>

        <View style={styles.container}>
          <H3 style={styles.text}>Share App Screen</H3>
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
  }
})
