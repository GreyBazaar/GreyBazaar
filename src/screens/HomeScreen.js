import React, { Component } from "react";
import { ImageBackground, View, StatusBar, Dimensions, Platform, StyleSheet } from "react-native";
import { Container, Button, H3, Text, Header, Left, Right, Body, Title, } from "native-base";
import colors from '../../assets/colors'
const deviceHeight = Dimensions.get("window").height;


export default class HomeScreen extends Component {


  componentDidMount() {
    console.disableYellowBox = true;
  }

  render() {
    return (
      <Container style={styles.container}>

        <Header style={{ backgroundColor: colors.colorBlack }}>
          <Body style={{ marginLeft: 40, }}>
            <Title>Home </Title>
          </Body>
          <Right />
        </Header>


        <Button
          style={styles.button}
          onPress={() => this.props.navigation.openDrawer()}
        >
          <Text>Lets Go!</Text>
        </Button>

        <Button
          style={styles.button}
          onPress={() => this.props.navigation.navigate('LoginRoute')}
        >
          <Text>Exit</Text>
        </Button>

      </Container>
    );
  }
}

const styles = StyleSheet.create({

  button: {
    backgroundColor: colors.colorBlue, //red
    alignSelf: "center",
    justifyContent: 'center',
    // margin:20,
    marginTop: 40,
    borderRadius: 10,
  },
  container: {
    backgroundColor: colors.colorShadow, //black
  },
})

