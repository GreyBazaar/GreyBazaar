import React, { Component } from "react";
import { ImageBackground, View, StatusBar, Dimensions, Platform, StyleSheet } from "react-native";
import { Container, Button, H3, Text, Header, Left, Right, Body, Title, Icon } from "native-base";
import colors from '../../assets/colors'


export default class SellerHomeScreen extends Component {


  componentDidMount() {
    console.disableYellowBox = true;
  }

  render() {
    return (
      <Container style={{ flex: 1, backgroundColor: colors.colorShadow }}>

        <Header style={{ backgroundColor: colors.colorWhite }}>
          <Left> 
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
            <Icon name='menu' style={{ color: colors.colorBlack }} />
          </Button></Left>
          <Body style={{ marginLeft: 40, }}>
            <Title style={{color: colors.colorBlack, fontWeight:'bold'}}>Home</Title>
          </Body>
          <Right />
        </Header>

        <Body style={styles.container}>

          <Button
            style={styles.button}
            onPress={() => this.props.navigation.navigate('RequestsRouteSeller')}
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
            onPress={() => this.props.navigation.openDrawer()}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
})

