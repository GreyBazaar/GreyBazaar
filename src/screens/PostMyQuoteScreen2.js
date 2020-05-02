import React, { Component } from "react";
import { ImageBackground, View, StatusBar, Dimensions, Platform, StyleSheet, TextInput, TouchableOpacity, Picker, KeyboardAvoidingView, Alert } from "react-native";
import { Container, Button, H3, Text, Header, Left, Right, Body, Title, } from "native-base";
import colors from '../../assets/colors'
import { ScrollView } from "react-native-gesture-handler";
const deviceHeight = Dimensions.get("window").height;


export default class PostMyQuoteScreen2 extends Component {

    state = {
        remarks: '',
    }

    nextPressed = () => {
        Alert.alert('goto NextScreen')
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
                    <ScrollView>
                        <Text style={styles.label}> CLOTH SPECIFICATIONS: </Text>
                        <TouchableOpacity onPress={() => Alert.alert('Go to PostMyQuoteClothSpecs Screen')}
                            style={styles.clothspecsBox}>

                        </TouchableOpacity>

                        <Text style={styles.label}> REMARKS </Text>
                        <TextInput
                            style={styles.inputBox}
                            underLineColorAndroid='#000000'
                            onChangeText={(text) => this.setState({ remarks: text })}
                        />
                        <Button
                            style={styles.button}
                            onPress={this.nextPressed}
                        >
                            <Text style={styles.skipFont}>NEXT</Text>
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
        backgroundColor: colors.colorShadow,
    },
    skipFont: {
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
