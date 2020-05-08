import React, { Component } from "react";
import { ImageBackground, View, StatusBar, Dimensions, Platform, StyleSheet, TextInput, Alert } from "react-native";
import { Container, Button, H3, Text, Header, Left, Right, Body, Title, } from "native-base";
import colors from '../../assets/colors'
const deviceHeight = Dimensions.get("window").height;
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';



export default class PostMyQuoteScreen1 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            rate: 0,
            deliveryDays: 0,
            id: '',
            from: ''
        }
    }

    componentDidMount() {
        const { state } = this.props.navigation;

        this.setState({
            id: state.params.id,
            from: state.params.from
        })
    }

    checkAllFilled = () => {
        console.log(this.state.id, this.state.from)
        if (this.state.rate && this.state.deliveryDays) {
            this.props.navigation.navigate('PostMyQuoteScreen2', {
                rate: this.state.rate,
                deliveryDays: this.state.deliveryDays,
                id: this.state.id,
                from: this.state.from
            })

            //Alert.alert('GOTO PostMyQuoteScreen2')
        } else if (!this.state.rate) {

            Alert.alert('Please enter valid Rate',
                '',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            )
        } else if (!this.state.deliveryDays) {

            Alert.alert('Please enter valid Delivery Days',
                '',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            )
        }

    }

    nextButtonPressed = () => {
        this.checkAllFilled()
    }

    render() {
        return (
            <Container style={{ flex: 1, backgroundColor: colors.colorBlue }}>

                {/* <Header style={{ backgroundColor: colors.colorBlack }}>
                    <Body style={{ marginLeft: 40, }}>
                        <Title>Post My Requirement </Title>
                    </Body>
                    <Right />
                </Header> */}

                <Body style={styles.container}>

                    <Text style={styles.label}> RATE: </Text>
                    <TextInput
                        style={styles.inputBox}
                        underLineColorAndroid='#000000'
                        placeholderTextColor='rgba(0,0,0,0.4)'
                        placeholder="5.50"
                        keyboardType="numeric"
                        onChangeText={(text) => this.setState({ rate: parseFloat(text) })}
                    />

                    <Text style={styles.label}>DELIVERY DAYS: </Text>
                    <TextInput
                        style={styles.inputBox}
                        underLineColorAndroid='#000000'
                        placeholder="2"
                        keyboardType='numeric'
                        placeholderTextColor='rgba(0,0,0,0.4)'
                        onChangeText={(text) => this.setState({ deliveryDays: parseFloat(text) })}
                    />

                    <View style={{ flexDirection: 'row' }}>
                        <Button
                            style={styles.button}
                            onPress={() => this.props.navigation.navigate('RequestNavigatorSeller')}
                        >
                            <Text style={styles.nextFont}>CANCEL</Text>
                        </Button>

                        <Button
                            style={styles.button}
                            onPress={() => this.nextButtonPressed()}
                        >
                            <Text style={styles.nextFont}>NEXT</Text>
                        </Button>
                    </View>

                </Body>
            </Container>
        )
    }
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
        marginHorizontal: 30,
    },
})
