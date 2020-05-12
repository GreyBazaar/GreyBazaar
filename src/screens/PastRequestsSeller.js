import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, ActivityIndicator, YellowBox, TextInput } from 'react-native'
import { Container, Button, H3, Header, Left, Right, Body } from "native-base";
//import * as firebase from 'firebase/app'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import colors from '../../assets/colors'
import { Title } from 'react-native-paper'

//var db = firebase.firestore()
export default class PastRequestsSeller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            id: 10,
            qualityType: '',
            quantity: '',
            date: '',
            request_close_at: '',
            request_name: '',
            delivery_days: 6,
            rate: 16.00,
            remarks: 'hell',

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
        console.log("success kinda")
        console.log(user.email)
        this.retrieveData(user.email)
    }

 
    retrieveData = async (email) => {
        try {
            // Set State: Loading
            this.setState({
                loading: true,
                direct: false
            });
            console.log('Retrieving past requestsData for seller ', email);
            // Cloud Firestore: Query
            let initialQuery = await firestore().collection('Seller').doc(email).collection('RequestToSeller')


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



    renderFooter = () => {
        try {
            // Check If Loading
            if (this.state.loading) {
                return (
                    <ActivityIndicator />
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

    sortData = () => {
        let data = []
        let rn = moment().format()
        let doc = this.state.documentData
        for (let i = 0; i < doc.length; i++) {
            if (moment(rn).isAfter(doc[i].close_day))
                data.push(doc[i])
        }
        console.log(data)
        this.setState({ documentData: data })


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
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                <View syle={{ flexDirection: 'column' }}>
                                    <Text style={styles.boxText2, { marginStart: 10, marginTop: 10 }}>REQUEST ID: {item.id}</Text>
                                    <Text style={styles.boxText2}>QUALITY TYPE: {item.qualityType}</Text>
                                    <Text style={styles.boxText2}>QUANTITY: {item.quantity}</Text>
                                    <Text style={styles.boxText2, { marginBottom: 8, marginStart: 10 }}>EXPECTED RATE: {item.expectedRate}</Text>
                                </View>


                                <View syle={{ flexDirection: 'column' }}>
                                    <Text style={styles.boxText2, { marginEnd: 10, marginTop: 10 }}>DATE: {item.close_time}</Text>
                                    <Text style={styles.boxText2, { marginEnd: 10 }}>EXPECTED DELIVERY DAYS : </Text>
                                    <Text style={styles.boxText2, { marginEnd: 10 }}>{item.selectedExpectedDelivery}</Text>
                                    <Text style={styles.boxText2, { marginEnd: 10, width: 200 }}>REMARKS : {item.remarks}</Text>
                                </View>
                            </View>
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
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('SellerHomeScreenRoute')}>
                    <Text style={{ color: "white", fontSize: 14 }}>BACK</Text>
                </TouchableOpacity>

            </SafeAreaView>
        );
    }

    /*render() {
        return(
            <SafeAreaView style = {styles.container}>
                
                <View style = {{flexDirection: 'row', alignContent: 'center', justifyContent: 'space-evenly'}}>
                    <TouchableOpacity style = {styles.button2} >
                        <Text style = {{color: 'white'}}>SORT BY</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.button2}>
                        <Text style = {{color: 'white'}}>FILTER</Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles.box}>
                    <Text style = {styles.boxText2, {marginStart:10,marginTop:10}}>REQUEST ID: 1234</Text>
                    <View style = {{flexDirection: 'row'}}>
                        <Text style = {styles.boxText2}>DATE: 29/3/20</Text>
                        <Text style = {styles.boxText2,{paddingLeft:75}}>REQUEST CLOSES AT : 12:30 pm</Text>
                    </View>
                    <Text style = {styles.boxText2}>QUALITY TYPE: 52 X 52</Text>
                    <Text style = {styles.boxText2}>QUANTITY: 100 TAKA</Text>
                    <Text style = {styles.boxText2, {marginBottom:8,marginStart:10}}>SEND REQUIREMENT TO: ALL SELLERS</Text>
                    <TouchableOpacity 
                        style = {styles.button2}
                        onPress = {() => this.props.navigation.navigate('ViewQuotes')}
                    >
                        <Text style = {styles.boxText}>VIEW QUOTES</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                style = {styles.button}
                 onPress = {() => this.props.navigation.navigate('HomeScreenRoute')}>
                    <Text style = {{color: "white", fontSize : 14}}>BACK</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }*/
}

const styles = StyleSheet.create({

    button: {
        //marginHorizontal: 30,
        backgroundColor: colors.colorBlue,
        borderRadius: 8,
        height: 42,
        justifyContent: "center",
        alignItems: "center",
        width: 100,
        alignSelf: 'center',
        marginBottom: 20

    },
    button2: {
        //marginHorizontal: 30,
        backgroundColor: colors.colorBlue,
        borderRadius: 0,
        height: 32,
        justifyContent: "center",
        alignItems: "center",
        width: 100,
        alignSelf: 'center',
        marginBottom: 10,
        elevation: 20,


    },
    container: {
        flex: 1,


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