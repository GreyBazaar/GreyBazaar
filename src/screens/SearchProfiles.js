import React, { Component } from "react";
import {  View,  StyleSheet,  TouchableOpacity, FlatList, ActivityIndicator, SafeAreaView,  } from "react-native";
import {  Text, Header, } from "native-base";
import colors from '../../assets/colors'

import { Item, Icon, Input,  Button, } from 'native-base'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

Array.prototype.unique = function () {
  return Array.from(new Set(this));
}


export default class SearchProfiles extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //db: firebase.firestore(),
      data: [],
      search: '',
      displayData: [],
      favs: [],
      favData: [],
      documentData: [],
      limit: 9,
      lastVisible: null,
      loading: false,
      refreshing: false,
      notfirstTime: true,
      direct: 'false',
      visible: false,
      checked: true,
      refreshed: false,
      selected_sellers: []

    }

  }


  onFocusFunction = (email) => {
    //const user = auth().currentUser
    console.log("i am focused")

    firestore()
      .collection("Users").doc(email)
      .get()
      .then((querySnapshot) => {

        var favs
        favs = querySnapshot.get("favorites")
        this.setState(
          {
            favs: favs
          }
        )

      });
    this.handleChange('')

  }



  componentDidMount() {


    const user = auth().currentUser
    //email = 'abc@gmail.com'
    this.setState({ email: user.email })

    console.log("success kinda")

    //this.firebasegetdata(user.email)
    //this.retrieveData(user.email)
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.onFocusFunction(user.email)
    })
    this.retrieveData()

    // firebase
    //   .firestore()
    //   .collection("Users").doc(user.email)
    //   .get()
    //   .then((querySnapshot) => { 

    //       var favs
    //       favs = querySnapshot.get("favorites")
    //      console.log("My Favs"+favs)

    //   });

  }

  componentWillUnmount() {
    this.focusListener.remove()
  }


  renderFooter = () => {
    try {
      // Check If Loading
      if (this.state.loading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', marginTop: 300 }}>
            <ActivityIndicator size="large" color="#1a237e" />
          </View>
        )
      }
      else {
        return null;
      }
    }
    catch (error) {
      console.log(error);
    }
  };






  static navigationOptions = {
    title: 'Select Sellers',
    headerStyle: {
      backgroundColor: colors.colorWhite,
    },
    headerTintColor: colors.colorBlack,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  retrieveData = async () => {
    try {
      // Set State: Loading
      this.setState({
        loading: true,
        direct: false
      });
      console.log('Retrieving Data from collection Seller ');
      // Cloud Firestore: Query
      let initialQuery = await firestore().collection('Seller')


        .limit(this.state.limit)

      firestore.setLogLevel('debug')
      firestore()
      // Cloud Firestore: Query Snapshot
      let documentSnapshots = await initialQuery.get();
      // Cloud Firestore: Document Data
      let documentData = documentSnapshots.docs.map(document => document.data());
      // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
      //let lastVisible = documentData[documentData.length - 1].id;
      // Set State
      console.log(documentData)
      this.setState({
        documentData: documentData,
        //lastVisible: lastVisible,
        loading: false,
      });
    }
    catch (error) {
      console.log('error isss : ', error);
      this.setState({ loading: false, direct: true })

    }
  };
  // Retrieve More
  retrieveMore = async () => {
    try {
      // Set State: Refreshing
      this.setState({
        refreshing: true,
      });
      console.log('Retrieving additional Data');
      // Cloud Firestore: Query (Additional Query)
      let additionalQuery = await firestore().collection('Seller')
        .startAfter(this.state.lastVisible)
        .limit(this.state.limit)

      // Cloud Firestore: Query Snapshot
      let documentSnapshots = await additionalQuery.get();
      // Cloud Firestore: Document Data
      let documentData = documentSnapshots.docs.map(document => document.data());
      // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
      let lastVisible = documentData[documentData.length - 1].id;
      // Set State
      this.setState({
        documentData: [...this.state.documentData, ...documentData],
        lastVisible: lastVisible,
        refreshing: false,
      });
    }
    catch (error) {
      console.log("error is :", error);
    }
  };

  isChecked = (item) => {
    let selected_data = this.state.selected_sellers
    var data = this.state.documentData.map(e => {
      if (item.email === e.email) {
        item.checked = !e.checked;
        if( item.checked == false){
          item.color = '#f8bbd0'
          selected_data.push(item.email)
        }
        else {
          selected_data.pop(item.email)
          item.color = colors.colorBlue
        }
        //selected_data = this.state.selected_sellers.map(item => item.email)

        //console.log(e.id)
        //console.log(item.color)


        return item;

      }
      else {
        //console.log(data)
        return e;
      }

    });
    console.log('checked dtaa is ', this.state.selected_sellers)
    this.setState({ documentData: data, selected_sellers: selected_data })
    //item.color = 'white'

  }

  unCheck = (item) => {
    let selected_data = this.state.selected_sellers.unique()
    var data = this.state.documentData.map(e => {
      if (item.name === e.name) {
        item.unchecked = !e.unchecked;


        item.color = colors.colorBlue
        if (selected_data.indexOf(item.email) > -1)
          selected_data.splice(selected_data.indexOf(item.email), 1);


        //console.log(e.id)
        //console.log(item.color)


        return item;

      }
      else {
        //console.log(data)
        return e;
      }

    });
    this.setState({ documentData: data, selected_sellers: selected_data })
    //item.color = 'white'


  }



  handleChange = async (search) => {
    let Data = []
    this.setState({ displayData: [] })
    try {
      this.setState({ loading: true })
      console.log('searching for ', search)
      await firestore().collection('Users')
        .where('keywords', 'array-contains', search)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            Data.push(doc.data());


          });
        })
      console.log(Data)
      this.setState({
        //documentData: Data,
        displayData: Data,
        loading: false,

      }, console.log("This is the data we are looking for : " + this.state.displayData));
      //Data=[]



    }

    catch (error) {
      console.log(error);
    }
  }



  doneSelect = () => {
    let unique = this.state.selected_sellers.unique()
    console.log(unique)
    this.setState({
      selected_sellers: unique
    })
  }



  render() {
    console.disableYellowBox = true
    var { navigate } = this.props.navigation;
    return (




      <SafeAreaView style={styles.container}>

        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search for sellers"
            //onChangeText={(search) => this.handleChange(search)}
            />
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Search </Text>
          </Button>

        </Header>

        <Text style={styles.heading}>Tap on the names to select</Text>
        <Text style={styles.heading}>Tap and hold on the names to unselect</Text>

        <FlatList
          scrollEnabled={true}
          // Data
          data={this.state.documentData}

          // Render Items
          renderItem={({ item }) => (

            //this.checkDate(item.day,item.event_name),
            <View style={{
              borderColor: '#f48fb1',
              margin: 10,
              borderWidth: 1, backgroundColor: item.color
            }}>
              <TouchableOpacity
                onPress={() => this.isChecked(item)}
                onLongPress={() => this.unCheck(item)}
              >
                <View style={{ flexDirection: 'column' }}>
                  <Text style={styles.text1}>{item.name}</Text>


                </View>
              </TouchableOpacity>

            </View>

          )}
          // Item Key
          keyExtractor={(item, index) => String(index)}
          // Header (Title)
          ListHeaderComponent={this.renderHeader}
          // Footer (Activity Indicator)
          ListFooterComponent={this.renderFooter}
          // On End Reached (Takes a function)
          //onEndReached={this.retrieveMore}
          // How Close To The End Of List Until Next Data Request Is Made
          onEndReachedThreshold={0}
          // Refreshing (Set To True When End Reached)
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}

        />

        <TouchableOpacity
          onPress={() => {
            this.doneSelect(),
            this.props.navigation.navigate('SendRequirementToRoute', {selected_sellers: this.state.selected_sellers, some_selected:true})
          }}
          style={styles.button}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.colorBlue, alignSelf: 'center' }}>DONE</Text>
        </TouchableOpacity>

      </SafeAreaView>

    );



  }
}

const styles = StyleSheet.create({

  box: {
    borderColor: '#f48fb1',
    margin: 10,
    borderWidth: 1,

  },
  container: {
    flex: 1,
    backgroundColor: colors.colorBlue
  },
  text1: {
    color: 'white',
    fontSize: 20,
    margin: 10
  },
  heading: {
    fontSize: 18,
    color: colors.colorGrey,
    margin: 15,

    alignSelf: 'center'
  },
  button: {
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#ec407a',
    backgroundColor: '#f8bbd0',
    alignSelf: 'center',
    alignContent: 'center',
    height: 35,
    width: 100,
    marginBottom: 15,
    justifyContent: 'center'
  }

})
