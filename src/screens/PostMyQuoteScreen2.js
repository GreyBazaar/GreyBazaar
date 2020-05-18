import React, { Component } from "react";
import { ImageBackground, View, StatusBar, Dimensions, Platform, StyleSheet, TextInput, TouchableOpacity, Picker, KeyboardAvoidingView, Alert } from "react-native";
import { Container, Button, H3, Text, Header, Left, Right, Body, Title, Icon } from "native-base";
import colors from '../../assets/colors'
import { ScrollView } from "react-native-gesture-handler";
const deviceHeight = Dimensions.get("window").height;
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment';

export default class PostMyQuoteScreen2 extends Component {

    state = {
        // current user email (seller)
        email: '',

        //today's date and time of submit quote
        date: '',
        time: '',

        //from this screen
        remarks: '',

        // from seller requests screen
        from: '',
        id: '',

        // from post my quote screen 1
        rate: '',
        deliveryDays: '',

        //from clothspecification screen
        weight: '',
        panna: '',
        reed: '',
        peak: '',
        warp: '',
        weft: '',
        combedCarded: '',
        clothSpecificationsFilled: false,

        //quote id
        quoteId: '',

        //qualityType (fetched from db, to be added to quotes doc)
        qualityType: '',
    }

    componentDidMount() {
        //id => request id, from: buyer email
        const { state } = this.props.navigation;
        this.setState({
            id: state.params.id,
            from: state.params.from
        })

        //get current user
        const user = auth().currentUser
        this.setState({ email: user.email })

        //get current date
        const date = moment().format('DD/MM/YY')
        this.setState({ date })

        //get quality type
        this.fetchQualityType(state.params.from, state.params.id)

    }

    fetchQualityType = async (fromBuyer, requestId) => {
        //get data from request (qualityType)
        let requestData = await firestore().collection('BuyerRequests').doc(fromBuyer).collection('MyRequests')
            .doc(requestId).get();
        qualityType = requestData.data().qualityType
        this.setState({ qualityType })

    }

    checkEditBuyer = () => {
        firestore().collection('Seller').doc(this.state.email).collection('RequestToSeller').doc(this.state.id).update({
            checked: true,
            quoteId: this.state.quoteId
        })
            //checked field signifies quote has been sent by seller
            //accepted field indicates quote has been accepted by buyer
            .then(console.log('checked field updated'))
            .catch((error) => {
                console.log('Error updating checked field : ', error)
            })

    }

    sendToDatabaseBuyer = () => {

        firestore().collection('BuyerRequests').doc(this.state.from).collection('MyRequests').doc(this.state.id).collection('Quotes').doc(this.state.quoteId).set({

            //from post my quote screen 2
            remarks: this.state.remarks,

            //from post my quote screen 1
            rate: this.state.rate,
            deliveryDays: this.state.deliveryDays,

            //from clothspecification screen
            weight: this.state.weight,
            panna: this.state.panna,
            reed: this.state.reed,
            peak: this.state.peak,
            warp: this.state.warp,
            weft: this.state.weft,
            combedCarded: this.state.combedCarded,
            clothSpecificationsFilled: this.state.clothSpecificationsFilled,

            //fetched from buyer request
            qualityType: this.state.qualityType,

            //primary key of quote
            id: this.state.quoteId,

            //seller email
            quoteGivenBy: this.state.email,

            //current date and time
            date: this.state.date,
            time: this.state.time,

            //whether accepted by buyer
            accepted: false,
        })
            .then(() => console.log("doc added successfully to buyer database", this.state.quoteId))
            .catch(function (error) {
                console.error("error adding ", error);
            });
    }

    sendToDatabaseSeller = () => {
        firestore().collection('Seller').doc(this.state.email).collection('RequestToSeller').doc(this.state.id).collection('MyQuote').doc(this.state.quoteId).set({

            //from post my quote screen 2
            remarks: this.state.remarks,

            //from post my quote screen 1
            rate: this.state.rate,
            deliveryDays: this.state.deliveryDays,

            //from clothspecification screen
            weight: this.state.weight,
            panna: this.state.panna,
            reed: this.state.reed,
            peak: this.state.peak,
            warp: this.state.warp,
            weft: this.state.weft,
            combedCarded: this.state.combedCarded,
            clothSpecificationsFilled: this.state.clothSpecificationsFilled,

            //fetched from buyer request
            qualityType: this.state.qualityType,

            //primary key of quote
            id: this.state.quoteId,

            //seller email
            requestBy: this.state.from,

            //current date and time
            date: this.state.date,
            time: this.state.time,

            //whether accepted by buyer
            accepted: false,

        })
            .then(() => console.log("doc added successfully to seller database", this.state.quoteId))
            .catch(function (error) {
                console.log("error adding ", error);
            });
    }


    submitPressed = () => {
        //make a quoteId
        const quoteId = moment().format('HmDDDSS')
        const time = moment().format('LTS')

        // retrieve filled data from post my quote screen 1
        const rate = this.props.navigation.getParam('rate', 'None')
        const deliveryDays = this.props.navigation.getParam('deliveryDays', 'None')

        // retrieve filled data from post my quote cloth specs
        const weight = this.props.navigation.getParam('weight', 'None')
        const panna = this.props.navigation.getParam('panna', 'None')
        const reed = this.props.navigation.getParam('reed', 'None')
        const peak = this.props.navigation.getParam('peak', 'None')
        const warp = this.props.navigation.getParam('warp', 'None')
        const weft = this.props.navigation.getParam('weft', 'None')
        const combedCarded = this.props.navigation.getParam('combedCarded', 'None')
        const clothSpecificationsFilled = this.props.navigation.getParam('clothSpecificationsFilled', this.state.clothSpecificationsFilled)

        // set it to the state
        this.setState({
            quoteId,

            rate,
            deliveryDays,

            time,

            weight,
            panna,
            reed,
            peak,
            warp,
            weft,
            combedCarded,
            clothSpecificationsFilled,
        }, () => { this.checkEditBuyer(), this.sendToDatabaseBuyer(), this.sendToDatabaseSeller(), this.props.navigation.navigate('RequestNavigatorSeller', { id: this.state.id }) })

    }

    static navigationOptions = {
        title: 'Post My Quote',
        headerStyle: {
            backgroundColor: colors.colorWhite,
        },
        headerTintColor: colors.colorBlack,
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };


    render() {

        return (
            <Container style={{ flex: 1, backgroundColor: colors.colorBlue }}>

                <Body style={styles.container}>
                    <ScrollView>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('PostMyQuoteClothSpecifications')}
                            style={styles.clothspecsBox}>
                            <Text style={[styles.label, { color: colors.colorBlack, textAlignVertical: 'center' }]}> CLOTH SPECIFICATIONS </Text>
                        </TouchableOpacity>

                        <Text style={styles.label}> REMARKS </Text>
                        <TextInput
                            style={styles.inputBox}
                            underLineColorAndroid='#000000'
                            onChangeText={(text) => this.setState({ remarks: text })}
                        />
                        <Button
                            style={styles.button}
                            onPress={() => this.submitPressed()}
                        >
                            <Text style={styles.submitFont}>SUBMIT</Text>
                        </Button>
                    </ScrollView>
                </Body>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 20,
    },
    label: {
        color: colors.colorWhite,
        fontSize: 14,
        marginTop: 24,
        marginBottom: 8,
    },
    inputBox: {
        paddingHorizontal: 16,
        width: 300,
        height: 50,
        backgroundColor: colors.colorShadow,
        fontSize: 16,
    },
    clothspecsBox: {
        height: 50,
        width: 300,
        paddingBottom: 18,
        backgroundColor: colors.colorShadow,
        borderRadius: 10,
        justifyContent: 'center',
        // textAlignVertical:'center',
        alignItems: 'center',
        flex: 1,
    },
    submitFont: {
        color: colors.colorBlack,
    },
    pickerStyle: {
        width: 300,
        height: 50,
        backgroundColor: colors.colorShadow,
    },
    button: {
        backgroundColor: colors.colorWhite,
        marginTop: 40,
        borderRadius: 10,
        alignSelf: 'flex-end',
    },
})
