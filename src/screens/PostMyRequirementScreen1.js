import React, { Component } from "react";
import { ImageBackground, View, StatusBar, Dimensions, Platform, StyleSheet, TextInput, Alert } from "react-native";
import { Container, Button, H3, Text, Header, Left, Right, Body, Title, } from "native-base";
import colors from '../../assets/colors'
const deviceHeight = Dimensions.get("window").height;
import * as firebase from 'firebase/app'
import 'firebase/firestore'


export default class PostMyRequirement1 extends Component {

    constructor() {
        super()
        this.state = {
            qualityType: '',
            quantity: '',
            email: '',
        }
    }

    componentDidMount() {
    }

    checkAllFilled = () => {
        if (this.state.qualityType && this.state.quantity) {
            this.props.navigation.navigate('PostMyRequirementRoute2', { qualityType: this.state.qualityType, quantity: this.state.quantity })
        } else if (!this.state.qualityType) {

            Alert.alert('Please enter Quality Type',
                '',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            )
        } else if (!this.state.quantity) {

            Alert.alert('Please enter Quantity',
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


                <Body style={styles.container}>

                    <Text style={styles.label}> QUALITY TYPE: </Text>
                    <TextInput
                        style={styles.inputBox}
                        underLineColorAndroid='#000000'
                        placeholderTextColor='rgba(0,0,0,0.4)'
                        placeholder="52 X 52"
                        onChangeText={(text) => this.setState({ qualityType: text })}
                    />

                    <Text style={styles.label}> QUANTITY (TAKA): </Text>
                    <TextInput
                        style={styles.inputBox}
                        underLineColorAndroid='#000000'
                        placeholder="100"
                        placeholderTextColor='rgba(0,0,0,0.4)'
                        onChangeText={(text) => this.setState({ quantity: text })}
                    />

                    <View style={{ flexDirection: 'row' }}>
                        <Button
                            style={styles.button}
                            onPress={() => this.props.navigation.navigate('HomeScreenRoute')}
                        >
                            <Text style={styles.nextFont}>CANCEL</Text>
                        </Button>

                        <Button
                            style={styles.button}
                            onPress={this.nextButtonPressed}
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
