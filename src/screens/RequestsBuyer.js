import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, ActivityIndicator, YellowBox, TextInput } from 'react-native'
import { Container, Button, H3, Header, Left, Right, Body } from "native-base";
//import * as firebase from 'firebase/app'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import colors from '../../assets/colors'
import { Title } from 'react-native-paper'

//var db = firebase.firestore()
export default class RequestsBuyer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            expectedRate: '',
            selectedExpectedDelivery: '',
            selectedCloseRequest: '',
            remarks: '',

            //from post my requirement1 screen
            quantity: '',
            qualityType: '',

            //from clothspecification screen
            weight: '',
            panna: '',
            reed: '',
            peak: '',
            warp: '',
            weft: '',
            combedCarded: '',
            clothSpecificationsFilled: false,
            id: '',

            //db: firebase.firestore(),

            documentData: [
                /*{
                    id:1234,date:'20/2/20',qualityType: '52x52',quantity:'100 TAKA',send_to:'All sellers',request_close_at:'12:30 pm'
                },
                 {
                    id:1132,date:'23/4/20',qualityType: '100x100',quantity:'200 TAKA',send_to:'Selected sellers',request_close_at:'10:00 pm'
                },
                {
                    id:1244,date:'16/5/20',qualityType: '100x100',quantity:'100 TAKA',send_to:'Selected sellers',request_close_at:'9:30 pm'
                },*/

            ],
            limit: 9,
            lastVisible: null,
            loading: false,
            refreshing: false,
            notfirstTime: true,
            direct: false,
            visible: false,
            item: [],
            // displayData: []

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
            let additionalQuery = await firestore().collection('BuyerRequests').doc(this.state.email).collection('MyRequests')
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

    /*showEvent = (item) => {
        console.log(item.event_name)
        this.props.navigation.navigate('ShowEvent', { event_name: item.event_name, sport: item.sport, no_people: item.no_people, venue: item.venue, date: item.date })

    }

    goEdit = (item) => {
        console.log(item.event_name)
        this.props.navigation.navigate('EditEvent', { event_name: item.event_name, sport: item.sport, no_people: item.no_people, venue: item.venue, date: item.date, day: item.day })

    }


    deleteEvent = () => {
        this.state.db.collection('CreatedEvent').doc(this.state.email).collection('MyEvent').doc(this.state.item.event_name).delete().then(function () {

            console.log("Document successfully deleted from CreatedEvent!");
            //alert('Event deleted')

        }).then(this.onFocusFunction(this.state.email),
            this.state.db.collection('AllEvents').doc(this.state.item.event_name).delete().then(function () {

                console.log("Document successfully deleted from AllEvents!");


            })
        )



            .catch(function (error) {
                console.error("Error removing document: ", error);
            });
            
    }

    deletEvent = (event) => {
        this.state.db.collection('CreatedEvent').doc(this.state.email).collection('MyEvent').doc(event).delete().then(function () {

            console.log("Document successfully deleted from CreatedEvent!");
            //alert('Event deleted')

        }).then(this.onFocusFunction(this.state.email),
            this.state.db.collection('AllEvents').doc(this.state.item.event_name).delete().then(function () {

                console.log("Document successfully deleted from AllEvents!");


            })
        )



            .catch(function (error) {
                console.error("Error removing document: ", error);
            });
            
    }
//{(today.isSameOrAfter(item.moment)?this.deleteEvent():console.log('ello'))}

    checkDate = (data,event) => {
        const rn = moment(right_now).format('YYYY-MM-DD')
        console.log(moment(right_now).format('YYYY-MM-DD')),
        console.log(data)
        console.log(moment(rn).isAfter(data))
        if(moment(rn).isAfter(data))
             this.deletEvent(event)
       
    }*/

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
                                    <Text style={styles.boxText2, { marginBottom: 8, marginStart: 10 }}>SEND REQUIREMENT TO: null</Text>
                                    
                                </View>
                                
                                <Text style={styles.boxText2, {marginVertical: 10}}>DATE: {item.date}</Text>
                            </View>
                            <TouchableOpacity
                                        style={styles.button2}
                                        onPress={() => this.props.navigation.navigate('ViewQuotes')}
                                    >
                                        <Text style={styles.boxText}>VIEW QUOTES</Text>
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
                    onEndReached={this.retrieveMore}
                    // How Close To The End Of List Until Next Data Request Is Made
                    onEndReachedThreshold={0}
                    // Refreshing (Set To True When End Reached)
                    refreshing={this.state.refreshing}
                /> : <View
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>NO REQUESTS</Text>

                    </View>}

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('HomeScreenRoute')}>
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

