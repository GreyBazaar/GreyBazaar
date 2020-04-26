import React, { Component } from "react";
import { ImageBackground, View, StatusBar, Dimensions, Platform, StyleSheet } from "react-native";
import { Container, Button, H3, Text, Header, Left, Right, Body, Title, } from "native-base";
import colors from '../../assets/colors'
const deviceHeight = Dimensions.get("window").height;


export default class SellerHomeScreen extends Component {


  componentDidMount() {
    console.disableYellowBox = true;
  }

  render() {
    return (
      <Container style={{flex:1, backgroundColor: colors.colorShadow}}>

        <Header style={{ backgroundColor: colors.colorBlack }}>
          <Body style={{ marginLeft: 40, }}>
            <Title>Home</Title>
          </Body>
          <Right />
        </Header>

      <Body  style={styles.container}>
        
        <Button
          style={styles.button}
          onPress={() => this.props.navigation.navigate('RequestsRoute')}
        >
          <Text>New Requests</Text>
        </Button>

        <Button
          style={styles.button}
          onPress={() => this.props.navigation.openDrawer()}
        >
          <Text>My Reports</Text>
        </Button>

        <Button
          style={styles.button}
          onPress={() => this.props.navigation.openDrawer()}
        >
          <Text>My Orders</Text>
        </Button>

        <Button
          style={styles.button}
          onPress={() => this.props.navigation.navigate('LoginRoute')}
        >
          <Text>Publish Grey Offers</Text>
        </Button>
        </Body>

      </Container>
    );
  }
}

const styles = StyleSheet.create({

  button: {
    backgroundColor: colors.colorBlue, 
    marginTop: 40,
    borderRadius: 10,
  },
  container: {
    alignItems:'center',
    justifyContent:'center',
  },
})

