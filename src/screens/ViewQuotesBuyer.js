import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TouchableHighlight, FlatList, ActivityIndicator, YellowBox } from 'react-native'
import { Container, Button, H3, Header, Left, Right, Body } from "native-base";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import colors from '../../assets/colors'
import { Title } from 'react-native-paper'

Array.prototype.unique = function () {
    return Array.from(new Set(this));
}

export default class ViewQuotesBuyer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            id: '',
            qualityType: '',
            quantity: '',
            documentData: [
                /*{
                    id: 1, qualityType: '52x52', rate: 'Rs. 16.00', days: 4,
                    color: 'white', checked: false
                },
                {
                    id: 2, qualityType: '52x52', rate: 'Rs. 15.50', days: 6,
                    color: 'white', checked: false
                },


            */],
            limit: 9,
            lastVisible: null,
            loading: false,
            refreshing: false,
            notfirstTime: true,
            direct: false,
            visible: false,
            item: [],


        }
    }

    componentDidMount () {
        const {state} = this.props.navigation;

        this.setState({
            id : state.params.id,
            email: state.params.email
        })
        this.retrieveData()
        
    }

    lowestQuote = () => {
        let data = this.state.documentData
        let rate = []
        let quotesBy = []

        for ( let i=0; i<data.length; i++)
           {
            rate.push(parseFloat(data[i].rate))
            
            quotesBy.push(data[i].quoteGivenBy)
           }

        rate = rate.unique()
        console.log(rate)
        quotesBy = quotesBy.unique()
        //console.log(quotesBy)
        let min = rate[0]

        for(let i=1; i<rate.length; i++)
        {
            if(rate[i]<min)
                min = rate[i]
        }
        console.log('lowest quote is ', typeof(min))
        
        // sending lowest quote to sellers
        for( let i=0; i<quotesBy.length; i++)
        {
            firestore().collection('Seller').doc(quotesBy[i]).collection('RequestToSeller').doc(this.state.id).update({
                lowestQuote : min
            })
            .then(console.log(' Lowest quote of ', min, ' sent to ', quotesBy[i], ' request id being ', this.state.id ))
            
            .catch((error) => {
                console.log('nested error occured updating accepted field : ', error)
            })
        }





    }


    isChecked = (item) => {

        var data = this.state.documentData.map(e => {
            if (item.id === e.id) {
                item.checked = !e.checked;
                item.color = '#f8bbd0'
                //console.log(e.id)
                //console.log(item.color)

                return item;

            }
            else {
                //console.log(data)
                return e;
            }

        });
        this.setState({ documentData: data })

    }

    static navigationOptions = {
        title: 'View Quotes',
        headerStyle: {
          backgroundColor: colors.colorWhite,
        },
        headerTintColor: colors.colorBlack,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      };


    isAccepted = (item) => {
        //accepted field indicates quote has been accepted by buyer
        let id = item.id
        let quoteBy = item.quoteGivenBy

        firestore().collection('BuyerRequests').doc(this.state.email).collection('MyRequests').doc(this.state.id).collection('Quotes').doc(id).update({
            accepted: true
        })
        //.then(console.log(' Quote of quote id ', id, ' accepted.' ))
        .then(
            
            firestore().collection('Seller').doc(quoteBy).collection('RequestToSeller').doc(this.state.id).update({
                accepted: true
            })
            .then(console.log(' Quote of quote id ', id, ' accepted.' ))
            .then(this.handleRefresh())
            .catch((error) => {
                console.log('nested error occured updating accepted field : ', error)
            })
        )
        .catch((error) => {
            console.log('error occured updating accepted field : ', error)
        })

        

       // this.setState({refreshing: true})


    }

    retrieveData = async () => {
        const {state} = this.props.navigation;

        let id = state.params.id
        let email = state.params.email
        try {
            // Set State: Loading
            this.setState({
                loading: true,
                direct: false
            });
            console.log('Retrieving Quotes Data for buyer ', email);
            // Cloud Firestore: Query
            let initialQuery = await firestore().collection('BuyerRequests').doc(email).collection('MyRequests').doc(id).collection('Quotes')


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
            
            this.lowestQuote()
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
            let additionalQuery = await firestore().collection('BuyerRequests').doc(this.state.email).collection('MyRequests').doc(this.state.id).collection('Quotes')
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

    handleRefresh = () => {
        try {
          this.setState({refreshing:true})
          this.retrieveData().then
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

                <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'space-evenly', paddingTop: 20 }}>
                    <TouchableOpacity style={styles.button2} >
                        <Text style={{ color: 'white' }}>SORT BY</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2}>
                        <Text style={{ color: 'white' }}>FILTER</Text>
                    </TouchableOpacity>
                </View>
                {(!this.state.direct) ? <FlatList
                    // Data
                    data={this.state.documentData}

                    // Render Items
                    renderItem={({ item, index, }) => (

                        //this.checkDate(item.day,item.event_name),

                        <View style={{
                            borderColor: colors.colorBlue,
                            margin: 10,
                            borderWidth: 1, backgroundColor: item.color
                        }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginEnd: 10 }}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={styles.boxText2}>SELLER </Text>
                                    <Text style={styles.boxText2}>RATE: Rs. {item.rate}</Text>
                                    <Text style={styles.boxText2}>DELIVERY DAYS: {item.deliveryDays}</Text>
                                </View>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={styles.boxText2}>QUALITY: {item.qualityType}</Text>
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('QualitySpecs')}

                                        style={{ backgroundColor: colors.colorGrey, width: 150, marginBottom: 10, marginTop: 7, borderWidth: 5, borderColor: colors.colorShadow }}
                                    >
                                        <Text style={{ color: 'black', alignSelf: 'center', textAlign: 'center' }}>QUALITY SPECIFICATIONS</Text>
                                    </TouchableOpacity>

                                </View>


                            </View>
                            <View style={{ flexDirection: 'row', alignContent: 'flex-end', justifyContent: 'flex-end' }}>
                                {(!item.accepted) ?
                                    <TouchableOpacity

                                        style={styles.button2}
                                        onPress={() => this.isAccepted(item)}


                                    >
                                        <Text style={{ textAlign: 'center', color: 'white' }}>ACCEPT</Text>
                                    </TouchableOpacity> :
                                    <TouchableOpacity

                                        style={styles.button3}
                                        onPress={() => this.props.navigation.navigate('AcceptConfirm')}


                                    >
                                        <Text style={{ textAlign: 'center', color: 'white' }}>CONFIRM ORDER</Text>
                                    </TouchableOpacity>

                    }

                                    <TouchableOpacity
                                    style={styles.button2}
                                //onPress = {() => this.setState ({ bordercolor: '#4fc3f7' , borderwidth: 8, disable_shortlist:true})}


                                >
                                    <Text style={{ textAlign: 'center', color: 'white' }}>CHAT</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    )}

                    // Item Key
                    keyExtractor={(item, index) => String(index)}
                    // Header (Title)
                    ListHeaderComponent={this.renderHeader}
                    // Footer (Activity Indicator)
                    //ListFooterComponent={this.renderFooter}
                    // On End Reached (Takes a function)
                    //onEndReached={this.retrieveMore}
                    // How Close To The End Of List Until Next Data Request Is Made
                    onEndReachedThreshold={0}
                    // Refreshing (Set To True When End Reached)
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                /> : <View
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>NO REQUESTS</Text>

                    </View>}


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
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        width: 100,
        alignSelf: 'center',
        marginBottom: 10,
        elevation: 20,
        marginLeft: 50,
        marginRight: 10


    },
    button3: {
        //marginHorizontal: 30,
        backgroundColor: colors.colorBlue,
        borderRadius: 0,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        width: 125,
        alignSelf: 'center',
        marginBottom: 10,
        elevation: 20,
        marginLeft: 90,
        //marginRight: 10
        


    },
    container: {
        flex: 1,


    },
    header: {
        alignSelf: "center",
        fontSize: 32,
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