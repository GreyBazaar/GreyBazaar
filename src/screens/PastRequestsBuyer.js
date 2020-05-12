import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, ActivityIndicator, YellowBox } from 'react-native'

//import * as firebase from 'firebase/app'
//import 'firebase/firestore'
import firestore from '@react-native-firebase/firestore';
import colors from '../../assets/colors'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import auth from '@react-native-firebase/auth';
import moment from 'moment';




export default class PastRequestsBuyer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            id: 10,
            qualityType: '',
            quantity: '',
            date: '',
            request_close_at: '',
            send_to: '',
            request_name: '',

            //db: firebase.firestore(),

            documentData: [],
            limit: 9,
            lastVisible: null,
            loading: false,
            refreshing: false,
            notfirstTime: true,
            direct: false,
            visible: false,
            item: [],
           displayData: []

        }
    }

    componentDidMount() {
        const user = auth().currentUser
        this.setState({ email: user.email })
       // console.log("success kinda")
       // console.log(user.email)
        this.retrieveData(user.email)
    }

    sortData = () => {
        let data = []
        let rn = moment().format()
        let doc = this.state.documentData
        for(let i=0; i<doc.length; i++){
            if(moment(rn).isAfter(doc[i].close_day))
                data.push(doc[i])
        }
        console.log(data)
        this.setState({ documentData: data})
           
        
    }

    handleRefresh = () => {
        try {
          this.setState({refreshing:true})
          this.retrieveData(this.state.email).then
          //this.handleChange('')
          (this.setState({
              
              refreshing:false
          }))
      }
      catch (error) {
        console.log(error);
      }
      }

    retrieveData = async (email) => {
        try {
            // Set State: Loading
            this.setState({
                loading: true,
                direct: false
            });
            console.log('Retrieving Data for ', email);
            // Cloud Firestore: Query
            let initialQuery = await firestore().collection('BuyerRequests').doc(email).collection('MyRequests')


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
            //console.log(documentData)
            this.setState({
                documentData: documentData,
                //lastVisible: lastVisible,
                loading: false,
            });
            this.sortData()
        }
        catch (error) {
            console.log('error isss : ', error);
            this.setState({ loading: false, direct: true })

        }
    };

    render() {
        // <NavigationEvents onDidFocus={() => console.log('I am triggered')} />
         console.disableYellowBox = true
         //console.log(today.format('MMMM Do YYYY, h:mm A'))
         //console.log(this.state.documentData)
 
         return (
             <SafeAreaView style={styles.container}>
 
 
                 {(!this.state.direct) ? <FlatList
                     // Data
                     data={this.state.documentData}
                     
                     // Render Items
                     renderItem={({ item }) => (
                         
                         //this.checkDate(item.day,item.event_name),
                         <View style={styles.box}>

                         <View style={{ flexDirection: 'row' }}>

                             <View style={{ flexDirection: 'column' }}>
                                 <Text style={styles.boxText2, { marginStart: 10, marginTop: 10 }}>REQUEST ID: {item.id}</Text>
                                 <Text style={styles.boxText2}>REQUEST CLOSES AT : {item.close_time}</Text>
                                 
                                 <Text style={styles.boxText2}>QUALITY TYPE: {item.qualityType}</Text>
                                 <Text style={styles.boxText2}>QUANTITY: {item.quantity}</Text>
                                 <Text style={styles.boxText2, { marginBottom: 8, marginStart: 10 }}>SEND REQUIREMENT TO: {item.send_to_title}</Text>
                                 
                             </View>
                             
                             <Text style={styles.boxText2, {marginVertical: 10}}>DATE: {item.date}</Text>
                         </View>
                         <TouchableOpacity
                                     style={styles.button2}
                                     onPress={() => this.props.navigation.navigate('ViewQuotes', {id : item.id, email: this.state.email})}
                                 >
                                     <Text style={styles.boxText}>VIEW QUOTES</Text>
                                 </TouchableOpacity>
                     </View>
                     )}
                     // Item Key
                     keyExtractor={(item, index) => String(index)}
                     // Header (Title)
                     
                     onEndReachedThreshold={0}
                     onRefresh={this.handleRefresh}
                     // Refreshing (Set To True When End Reached)
                     refreshing={this.state.refreshing}
                 /> : <View
                     style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                         <Text style={{ fontWeight: 'bold', fontSize: 25 }}>NO REQUESTS</Text>
                         
                     </View>}
 
                     <TouchableOpacity
                 style = {styles.button}
                  onPress = {() => this.props.navigation.navigate('HomeScreenRoute')}>
                     <Text style = {{color: "white", fontSize : 14}}>BACK</Text>
                 </TouchableOpacity>      
                 
             </SafeAreaView>
         );
     }
 
}


const styles = StyleSheet.create({

    button: {
        //marginHorizontal: 30,f
        
        backgroundColor: colors.colorBlue,
        borderRadius: 8,
        height: 42,
        justifyContent:"center",
        alignItems:"center",
       width: 100,
       alignSelf: 'center',
       marginBottom: 20
       
    },
    button2: {
        //marginHorizontal: 30,
        backgroundColor: colors.colorBlue,
        borderRadius: 0,
        height: 32,
        justifyContent:"center",
        alignItems:"center",
       width: 100,
       alignSelf: 'center',
       marginBottom: 10,
       elevation: 20,
       
       
    },
    container: {
      flex:1,
      
      
    },
    header: {
        alignSelf: "center",
        fontSize: 40,
        fontStyle: "italic",
        //flexDirection: 'row',
        marginBottom: 20,
        marginTop: 20
    },
    box: {
        borderColor: colors.colorBlue,
        margin: 10,
        borderWidth: 1
    },
    boxText: {
        color: 'white'
    },
    boxText2: {
        color: colors.colorBlue,
        marginLeft: 10,
    
    }
  })