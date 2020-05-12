import React from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import colors from '../../assets/colors'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';


Array.prototype.unique = function () {
  return Array.from(new Set(this));
}

export default class Favorites extends React.Component {

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
      fav_sellers: [],
      email: ''

    }

  }

  onFocusFunction = (email) => {
    this.retrieveData(email)
    console.log("i am focused")
    //console.log(today.format('MMMM Do YYYY, h:mm A'))

  }

  componentDidMount() {

    const user = auth().currentUser
    this.setState({ email: user.email })
    console.log("on addToFav screen")
    //this.retrieveData(user.email)
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.onFocusFunction(user.email)
    })

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
    title: 'Favourites',
    headerStyle: {
      backgroundColor: colors.colorWhite,
    },
    headerTintColor: colors.colorBlack,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  favArray = (documentData) => {

    for (let i = 0; i < documentData.length; i++) {
      this.state.fav_sellers.push(documentData[i].email)
    }
    this.setState({
      fav_sellers: this.state.fav_sellers.unique()

    })

  }

  retrieveData = async (email) => {
    try {
      // Set State: Loading
      this.setState({
        loading: true,
        direct: false
      });
      console.log('Retrieving Data from collection Seller ');
      // Cloud Firestore: Query
      let initialQuery = await firestore().collection('Buyer').doc(email).collection('MyFavorites')


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

      this.favArray(documentData)
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
      let additionalQuery = await firestore().collection('Buyer').doc(this.state.email).collection('MyFavorites')
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


  /*doneSelect = () => {
    let unique = this.state.selected_sellers.unique()
    console.log(unique)
    this.setState({
      selected_sellers: unique
    })
  }*/

  render() {
    console.log(this.state.documentData)
    console.disableYellowBox = true
    var { navigate } = this.props.navigation;
    return (




      <SafeAreaView style={styles.container}>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('AddToFavorites')}
          style={styles.button2}>
          <Text style={{ fontSize: 17, fontWeight: 'bold', color: colors.colorBlue, alignSelf: 'center' }}>ADD FAVOURITES</Text>
        </TouchableOpacity>

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
              borderWidth: 1
            }}>
              <TouchableOpacity disabled={true} onPress={() => { }}>

                <View style={{ flexDirection: 'column' }}>
                  <View style={{}}>


                    <Text style={styles.text1}>{item.name}</Text>
                    <Text style={styles.text1}>{item.company_name}</Text>


                  </View>



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
            console.log(this.state.fav_sellers)
            this.props.navigation.navigate('SendRequirementToRoute', { fav_sellers: this.state.fav_sellers })
            //this.doneSelect()
            //this.props.navigation.navigate('SendRequirementToRoute', {selected_sellers: this.state.selected_sellers, some_selected:true})
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
  },
  button2: {
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#ec407a',
    backgroundColor: '#f8bbd0',
    alignSelf: 'center',
    alignContent: 'center',
    height: 40,
    width: 200,
    marginTop: 15,
    justifyContent: 'center'
  },

})