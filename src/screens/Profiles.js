import React, { Component } from "react";
import { ImageBackground, View, StatusBar, Dimensions, Platform, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Container, Button, H3, Text, Header, Left, Right, Body, Title, } from "native-base";
import colors from '../../assets/colors'
const deviceHeight = Dimensions.get("window").height;
import { Content, Card, CardItem, Thumbnail } from 'native-base';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default class Profiles extends Component {

  constructor(props) {
    super(props);
    this.state = {
      iconname: "ios-timer",

      email: '',
      joined: 0,
      num: 0,
      limit_reached: false,
      registered: false,
      visible: false,
      isFavorite: false
    };

  }
  static navigationOptions = {
    title: 'Profiles',
    headerStyle: {
      backgroundColor: colors.colorWhite,
    },
    headerTintColor: colors.colorBlack,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  componentDidMount() {
    console.disableYellowBox = true;
    const user = auth().currentUser
    const doc = this.state.db.collection("Users").doc(user.email)
    var { params } = this.props.navigation.state
    var t

    firestore()
      .collection("Users").doc(user.email)
      .get()
      .then((querySnapshot) => {
        console.log("out snap") //Notice the arrow funtion which bind `this` automatically.

        console.log("In snap")
        var favs, t;
        favs = querySnapshot.get("favorites")
        t = favs.includes(params.item.name || params.item.email)
        console.log("name " + params.item.name)
        console.log(t + favs)
        this.setState({ isFavorite: t });   //set data in state here

        console.log(this.state.isFavorite)
        console.log(user.email)

      });
  }
  addFav = () => {
    var { params } = this.props.navigation.state
    const user = auth().currentUser
    let id = user.email

    const arrayUnion = firestore.FieldValue.arrayUnion;
    const doc = firestore().collection("Users").doc(id)
    doc.update({
      favorites: arrayUnion(params.item.name)
    });
    this.setState(
      {
        isFavorite: true
      }
    )

  }

  remFav = () => {
    var { params } = this.props.navigation.state
    const user = auth().currentUser
    let id = user.email

    const arrayRemove = firestore.FieldValue.arrayRemove;
    const doc = firestore().collection("Users").doc(id)
    doc.update({
      favorites: arrayRemove(params.item.name)
    });
    this.setState({
      isFavorite: false
    })



  }
  render() {

    var { params } = this.props.navigation.state
    return (
      <Container >

        <Content>
          <Card style={{ flex: 0 }}>
            <CardItem style={{ backgroundColor: '#4d4d4d' }}>
              <Left>
                {/* <Image source={require("../assets/profile-pic.jpg")} style={{height:55,width:55,borderRadius:100}} /> */}
                <Body>
                  <Text style={{ fontSize: 25 }}>{params.item.name}</Text>
                  <Text note style={{ fontSize: 15 }}>{params.item.year}-{params.item.branch}</Text>
                </Body>
              </Left>
              <Right>
                <Text note style={{ fontSize: 15 }}>Creator</Text>
              </Right>
            </CardItem>
            <CardItem>
              <Body style={{ alignItems: 'stretch' }}>
                <View>
                  <Text styles={{ fontWeight: 'bold' }}>Sports :</Text>
                  <Text style={[styles.text, { paddingBottom: 2 }]}>
                    {params.item.sports.map((item1, key) => (
                      <Text key={key} >{item1}{"\n"}</Text>)
                    )}
                  </Text>
                  <Text>
                    Rating : {params.item.ratings}{"\n"}
                                Teams  : {params.item.teams}{"\n"}
                                Wins   : {params.item.wins}{"\n"}
                  </Text>
                </View>
              </Body>

            </CardItem>
            {this.state.isFavorite ?
              <View>
                <Text>
                  {params.item.name} is already in your favorites!
                    </Text>
                <TouchableOpacity onPress={this.remFav}>
                  <View>
                    <Text>Remove From favorites</Text>
                  </View>
                </TouchableOpacity>
              </View>
              :
              <TouchableOpacity onPress={this.addFav}>
                <View>
                  <Text>
                    Add to Favorite
                        </Text>
                </View>
              </TouchableOpacity>

            }
          </Card>

        </Content>
      </Container>
    );
  }






  // render() {
  //     return (
  //         <Container style={{ flex: 1, backgroundColor: colors.colorBlue }}>

  //             {/* <Header style={{ backgroundColor: colors.colorBlack }}>
  //                 <Body style={{ marginLeft: 40, }}>
  //                     <Title>Post My Requirement </Title>
  //                 </Body>
  //                 <Right />
  //             </Header> */}

  //             <Body style={styles.container}>

  //                 <Text style={styles.label}> Send Requirement To: </Text>
  //                 <View>
  //                     <Text> Profiles</Text>
  //                 </View>

  //             </Body>
  //         </Container>
  //     )
  // }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    color: colors.colorWhite,
    fontSize: 14,
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
  nextFont: {
    color: colors.colorBlack,

  },
  button: {
    backgroundColor: colors.colorWhite,
    marginTop: 40,
    borderRadius: 10,
    alignSelf: 'flex-end',
  },
})
