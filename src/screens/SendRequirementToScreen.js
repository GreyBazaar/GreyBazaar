import React from "react";
import {  View, StyleSheet, TouchableOpacity } from "react-native";
import { Container, Text, } from "native-base";
import colors from '../../assets/colors'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import RadioButton from 'react-native-radio-button'



export default class SendRequirementToScreen extends React.Component {

    static navigationOptions = {
        title: 'Send Requirement To',
        headerStyle: {
          backgroundColor: colors.colorWhite,
        },
        headerTintColor: colors.colorBlack,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      };


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
            close_time: '',
            date: '',
            all_select: false,
            some_select: false,
            fav_select: false,
            send_request_to: [],
            send_to_title: '',
            close_day:''
        }
    }

    onFocusFunction = () => {
        //this.retrieveData()
        console.log("i am focused")
        //console.log(today.format('MMMM Do YYYY, h:mm A'))
        const { state } = this.props.navigation;

        if (this.state.some_select) {
            this.setState({
                send_request_to: state.params.selected_sellers,
                send_to_title: 'Selected Sellers'
            }, console.log('Send Request to ', this.state.send_to_title.toUpperCase(), state.params.selected_sellers, this.state.some_select))

        }

        if (this.state.fav_select) {
            this.setState({
                send_to_title: 'Favourites',
                send_request_to: state.params.fav_sellers
            }, console.log('Send Request to ', this.state.send_to_title.toUpperCase()))

        }

    }

    checking = () => {
        console.log(this.state.send_request_to)
    }




    componentDidMount() {
        console.log(this.state.some_select)
        const user = auth().currentUser
        this.setState({ email: user.email })
        console.disableYellowBox = true;
        const params = this.props.navigation.getParam('allRequirementsData', 'None')
        console.log('params from previous screen', params)
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.onFocusFunction()
        })
        var date = moment().format('DD/MM/YY')
        
        var close_time = moment().add(params.selectedCloseRequest, 'h').format('DD/MM/YY, hh:mm a')
        var close_day = moment().add(params.selectedCloseRequest, 'h').format()
    
        console.log(close_time,close_day)
        

        const { state } = this.props.navigation;
        //console.log('blah bhabhb',state.params.selected_sellers)




        this.setState({
            expectedRate: params.expectedRate,
            selectedExpectedDelivery: params.selectedExpectedDelivery,
            selectedCloseRequest: parseInt(params.selectedCloseRequest),
            remarks: params.remarks,

            //from post my requirement1 screen
            quantity: params.quantity,
            qualityType: params.qualityType,

            //from clothspecification screen
            weight: params.weight,
            panna: params.panna,
            reed: params.reed,
            peak: params.peak,
            warp: params.warp,
            weft: params.weft,
            combedCarded: params.combedCarded,
            clothSpecificationsFilled: params.clothSpecificationsFilled,
            close_time: close_time,
            date: date,
            close_day : close_day



        })
    }

    createId = () => {

        var identity = moment().format('HmDDDSS')
        this.setState({
            id: identity
        })

        return identity

    }

    handleCreate = () => {


        var identity = this.createId()
        //alert('Event created')
        console.log(this.state.event_name)
        firestore().collection('BuyerRequests').doc(this.state.email).collection('MyRequests').doc(this.createId()).set({
            expectedRate: this.state.expectedRate,
            selectedExpectedDelivery: this.state.selectedExpectedDelivery,
            selectedCloseRequest: this.state.selectedCloseRequest,
            remarks: this.state.remarks,

            //from post my requirement1 screen
            quantity: this.state.quantity,
            qualityType: this.state.qualityType,

            //from clothspecification screen
            weight: this.state.weight,
            panna: this.state.panna,
            reed: this.state.reed,
            peak: this.state.peak,
            warp: this.state.warp,
            weft: this.state.weft,
            combedCarded: this.state.combedCarded,
            clothSpecificationsFilled: this.state.clothSpecificationsFilled,
            id: identity,
            close_time: this.state.close_time,
            date: this.state.date,
            color: 'white',
            send_to_title: this.state.send_to_title,
            send_request_to: this.state.send_request_to,
            close_day: this.state.close_day


        })
            .then(() => console.log(identity), console.log("doc added successfully"))//, this.props.navigation.navigate('HomeScreenRoute', { refresh: 'true' }))
            .then(this.sendToSellers(identity), this.props.navigation.navigate('HomeScreenRoute', { refresh: 'true' }))
            .catch(function (error) {
                console.log("error adding ", error);
            });


    }

    sendToSellers = async (identity) => {
        let sendArr = this.state.send_request_to
        console.log(identity, sendArr)
        let len = this.state.send_request_to.length

        for (let i = 0; i < len; i++) {
            firestore().collection('Seller').doc(sendArr[i]).collection('RequestToSeller').doc(identity).set({
                expectedRate: this.state.expectedRate,
                selectedExpectedDelivery: this.state.selectedExpectedDelivery,
                selectedCloseRequest: this.state.selectedCloseRequest,
                remarks: this.state.remarks,
    
                //from post my requirement1 screen
                quantity: this.state.quantity,
                qualityType: this.state.qualityType,
    
                //from clothspecification screen
                weight: this.state.weight,
                panna: this.state.panna,
                reed: this.state.reed,
                peak: this.state.peak,
                warp: this.state.warp,
                weft: this.state.weft,
                combedCarded: this.state.combedCarded,
                clothSpecificationsFilled: this.state.clothSpecificationsFilled,
                id: identity,
                close_time: this.state.close_time,
                date: this.state.date,
                from: this.state.email,
                lowestQuote: null,
                close_day: this.state.close_day


            })
                .then(() => console.log("request ", identity, " sent to ",sendArr[i]," successfully"))
                .catch(function (error) {
                    console.log("error adding ", error);
                });
        }

    }

    addAllSellers = async () => {
        let data = []
        //console.log("This is the list" + this.state.favs)

        /*firestore()
            .collection("Seller")
            .get()
            .then((querySnapshot) => {

                querySnapshot.forEach(documentSnapshot => {
                    //console.log('Al sellers: ', documentSnapshot.email, documentSnapshot.data().email);
                    data.push(documentSnapshot.data().email)
                    
                  });

                  

                //console.log("My DATA" + querySnapshot.data().email)
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());

                //data.push(querySnapshot.data())

                //  this.setState(
                //    {
                //      favData :[ ...this.state.favData, querySnapshot.data() ]
                //    }
                //  )

            });*/
        try {

            let initialQuery = await firestore().collection('Seller')
            // Cloud Firestore: Query Snapshot
            let documentSnapshots = await initialQuery.get();
            // Cloud Firestore: Document Data
            let documentData = documentSnapshots.docs.map(document => document.data().email);

            this.setState({
                send_request_to: documentData,
                send_to_title: 'All Sellers'

            });
            console.log('Send Request to ', this.state.send_to_title.toUpperCase(), this.state.send_request_to)
        }
        catch (error) {
            console.log(error)
        }

        return console.log('done')


    }

    render() {
        return (
            <Container style={styles.container}>

                {/* <Header style={{ backgroundColor: colors.colorBlack }}>
                    <Body style={{ marginLeft: 40, }}>
                        <Title>Post My Requirement </Title>
                    </Body>
                    <Right />
                </Header> */}



                <View style={{ paddingVertical: 100 }}>
                    <View style={{ flexDirection: 'row', marginBottom: 40 }}>
                        <RadioButton
                            onPress={() => this.addAllSellers().then(this.setState({
                                all_select: true,
                                some_select: false,
                                fav_select: false
                            }))}

                            animation={'bounceIn'}
                            isSelected={this.state.all_select}
                            innerColor={'#f48fb1'}
                            outerColor={'#f48fb1'}
                            size={15}


                        />
                        <Text style={styles.label}>All Sellers</Text>
                    </View>


                    <View style={{ flexDirection: 'row', marginBottom: 40 }}>
                        <RadioButton
                            onPress={() => this.setState({
                                some_select: true,
                                fav_select: false,
                                all_select: false
                            }, console.log(this.state.some_select), this.props.navigation.navigate('SearchProfiles'))}

                            animation={'bounceIn'}
                            isSelected={this.state.some_select}
                            innerColor={'#f48fb1'}
                            outerColor={'#f48fb1'}
                            size={15}


                        />
                        <Text style={styles.label}>Select Sellers</Text>
                    </View>

                    
                    <View style={{ flexDirection: 'row', marginBottom: 40 }}>
                        <RadioButton
                            onPress={() => this.setState({
                                fav_select: true,
                                all_select: false,
                                some_select: false
                            }, console.log(this.state.fav_select), this.props.navigation.navigate('Favorites'))}

                            animation={'bounceIn'}
                            isSelected={this.state.fav_select}
                            innerColor={'#f48fb1'}
                            outerColor={'#f48fb1'}
                            size={15}


                        />
                        <Text style={styles.label}>Favorites</Text>

                    </View>

                </View>

                <TouchableOpacity style={styles.button2}
                    onPress={() => this.handleCreate()}>
                    <View>
                        <Text style={{ color: colors.colorBlue, fontWeight: 'bold', fontSize: 27, alignSelf: 'center', textAlign: 'center' }}>SUBMIT REQUEST</Text>
                    </View>
                </TouchableOpacity>


            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.colorBlue
    },
    label: {
        color: 'white',
        fontSize: 30,
        marginLeft: 5,
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
    button: {
        backgroundColor: colors.colorWhite,
        //marginTop: 40,
        borderRadius: 8,
        width: 130,
        alignItems: 'center',
        height: 35,
        margin: 20,
        justifyContent: 'center'

        //alignSelf: 'flex-end',
    },
    button2: {
        borderRadius: 15,
        backgroundColor: 'white',
        height: 48,
        width: 260,
        alignItems: 'center',
        justifyContent: 'center',


    },
    text1: {
        color: colors.colorBlue
    }
})
