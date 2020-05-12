import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, ActivityIndicator, YellowBox, TextInput } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import colors from '../../assets/colors'



//var db = firebase.firestore()
export default class RequestsSeller extends React.Component {
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
            documentData:[],

            //db: firebase.firestore(),

            /*documentData: [
                {
                    id: 1234, date: '20/2/20', qualityType: '52x52', quantity: '100 TAKA', request_close_at: '12:30 pm', delivery_days: 6,
                    rate: 16.00, remarks: '', checked: false
                },
                {
                    id: 1132, date: '23/4/20', qualityType: '100x100', quantity: '200 TAKA', request_close_at: '10:00 pm', delivery_days: 8,
                    rate: 21.00, remarks: '', checked: false
                },


            ],*/
            //limit: 9,
            lastVisible: null,
            loading: false,
            refreshing: false,
            notfirstTime: true,
            direct: false,
            visible: false,
            item: [],
            direct: true,
            displayData: []

        }
    }

    componentDidMount() {
        const user = auth().currentUser
        this.setState({ email: user.email })
        //console.log("success kinda")
        // console.log(user.email)
        //this.retrieveData(user.email)
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.onFocusFunction(user.email)
        })
      
    }

    onFocusFunction = (email) => {
        this.retrieveData(email)
        console.log("Focused on RequestsSeller screen")
        //console.log(today.format('MMMM Do YYYY, h:mm A'))
       
        

    }

    componentWillUnmount() {
        this.focusListener.remove()
    }

    isChecked = (item) => {

        var data = this.state.documentData.map(e => {
            if (item.id === e.id) {
                item.checked = !e.checked;

                return item;

            }
            else {
                //console.log(data)
                return e;
            }

        });
        this.setState({ documentData: data })

    }



     retrieveData = async (email) => {
         try {
             // Set State: Loading
             this.setState({
                 loading: true,
                 direct: true
             });
             console.log('Retrieving Data for seller ', email);
             // Cloud Firestore: Query
             let initialQuery = await firestore().collection('Seller').doc(email).collection('RequestToSeller')
              
 
             //.limit(this.state.limit)
 
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
             console.log('error isss : ',error);
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
            //  console.log('Retrieving additional Data');
             // Cloud Firestore: Query (Additional Query)
             let additionalQuery = await firestore().collection('Seller').doc(this.state.email).collection('RequestToSeller')
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
             this.sortData()
         }
         catch (error) {
             console.log("error retrieving more is :" ,error);
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
        for(let i=0; i<doc.length; i++){
            if(moment(rn).isBefore(doc[i].close_day))
                data.push(doc[i])
        }
        console.log(data)
        this.setState({ documentData: data})
           
        
    }

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


                <FlatList
                    // Data
                    data={this.state.documentData}

                    // Render Items
                    renderItem={({ item }) => (

                        //this.checkDate(item.day,item.event_name),
                        <View style={styles.box}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                <View syle = {{flexDirection: 'column'}}>
                                <Text style={styles.boxText2, { marginStart: 10, marginTop: 10 }}>REQUEST ID: {item.id}</Text>
                                <Text style={styles.boxText2}>QUALITY TYPE: {item.qualityType}</Text>
                                <Text style={styles.boxText2}>QUANTITY: {item.quantity}</Text>
                                <Text style={styles.boxText2, { marginBottom: 8, marginStart: 10 }}>EXPECTED RATE: {item.expectedRate}</Text>
                                </View>

                                
                                <View syle = {{flexDirection: 'column'}}>
                                <Text style={styles.boxText2, { marginEnd: 10, marginTop: 10 }}>DATE: {item.close_time}</Text>
                                <Text style={styles.boxText2, { marginEnd: 10 }}>EXPECTED DELIVERY DAYS : </Text>
                                <Text style={styles.boxText2, { marginEnd: 10 }}>{item.selectedExpectedDelivery}</Text>
                                <Text style={styles.boxText2, { marginEnd: 10 , width: 200}}>REMARKS : {item.remarks}</Text>
                                </View>
                            </View>

                            {(!item.checked) ?

                                (<TouchableOpacity
                                    style={styles.button2}
                                    onPress={() => this.props.navigation.navigate('PostMyQuoteScreen1',{id: item.id, from: item.from})} //this.isChecked(item)}
                                >
                                    <Text style={styles.boxText}>SEND QUOTE</Text>
                                </TouchableOpacity>) :
                               
                                ((!item.accepted)?
                                <View style={{ flexDirection: 'row', }}>
                                    <View style = {{flexDirection: 'column', width: 150}}>
                                    <Text style={{ marginLeft: 10, fontWeight: 'bold', marginBottom: 10 }}>AWAITING BUYER ACCEPTANCE ... </Text>
                                    </View>
                                    <View syle = {{flexDirection: 'column'}}>
                                    <Text style={{ marginRight: 10, fontWeight: 'bold' , marginLeft: 65}}>LOWEST QUOTE: {item.lowestQuote}</Text>
                                    </View>

                                </View>:<TouchableOpacity
                                    style={styles.button3}
                                    onPress={() => 
                                        this.props.navigation.navigate('OrderSummarySeller',
                                        {quantity: item.quantity, qualityType: item.qualityType, reqID: item.id, email: this.state.email, quoteId: item.quoteId}
                                        )}
                                >
                                    <Text style={styles.boxText}>VIEW ORDER SUMMARY</Text>
                                </TouchableOpacity>)
                            }
                        </View>

                    )}
                    // Item Key
                    keyExtractor={(item, index) => String(index)}
                    // Header (Title)
                    ListHeaderComponent={this.renderHeader}
                    // Footer (Activity Indicator)
                  //  ListFooterComponent={this.renderFooter}
                    // On End Reached (Takes a function)
                  //  onEndReached={this.retrieveMore}
                    // How Close To The End Of List Until Next Data Request Is Made
                    onEndReachedThreshold={0}
                    // Refreshing (Set To True When End Reached)
                    onRefresh={this.handleRefresh}

                    refreshing={this.state.refreshing}
                /> 
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('SellerHomeScreenRoute')}>
                    <Text style={{ color: "white", fontSize: 14 }}>BACK</Text>
                </TouchableOpacity>

            </SafeAreaView>
        );
    }


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

    },
    button3: {
        //marginHorizontal: 30,
        backgroundColor: colors.colorBlue,
        borderRadius: 0,
        height: 32,
        justifyContent: "center",
        alignItems: "center",
        width: 200,
        alignSelf: 'center',
        marginBottom: 10,
        elevation: 5,


    },
})

/*
<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.boxText2, { marginStart: 10, marginTop: 10 }}>REQUEST ID: {item.id}</Text>
                                <Text style={styles.boxText2, { marginEnd: 10, marginTop: 10 }}>DATE: {item.date} , {item.request_close_at}</Text>
                            </View>
                            <Text style={styles.boxText2}>QUALITY TYPE: {item.qualityType}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.boxText2}>QUANTITY: {item.quantity}</Text>
                                <Text style={styles.boxText2, { marginEnd: 10 }}>DELIVERY DAYS : {item.delivery_days}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.boxText2, { marginBottom: 8, marginStart: 10 }}>RATE: {item.rate}</Text>
                                <Text style={styles.boxText2, { marginEnd: 10 }}>REMARKS : {item.remarks}</Text>
                            </View>*/