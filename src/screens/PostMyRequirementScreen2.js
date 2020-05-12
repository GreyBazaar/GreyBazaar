import React, { Component } from "react";
import { ImageBackground, View, StatusBar, Dimensions, Platform, StyleSheet, TextInput, TouchableOpacity, Picker, KeyboardAvoidingView } from "react-native";
import { Container, Button, H3, Text, Header, Left, Right, Body, Title, } from "native-base";
import colors from '../../assets/colors'
import { ScrollView } from "react-native-gesture-handler";
const deviceHeight = Dimensions.get("window").height;



export default class PostMyRequirement2 extends Component {

    state = {
        //this screen
        expectedRate: '',
        selectedExpectedDelivery: '',
        selectedCloseRequest: '8',
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
    }

    skipPressed = () => {
        // retrieve filled data from post my requirement screen 1
        const qualityType = this.props.navigation.getParam('qualityType', 'None')
        const quantity = this.props.navigation.getParam('quantity', 'None')

        // retrieve filled data from post my requirement cloth specs
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
            qualityType,
            quantity,

            weight,
            panna,
            reed,
            peak,
            warp,
            weft,
            combedCarded,
            clothSpecificationsFilled,
        },
            () => this.props.navigation.navigate('SendRequirementToRoute', { allRequirementsData: this.state }))
    }

    static navigationOptions = {
        title: 'Post My Requirement',
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

                {/* <Header style={{ backgroundColor: colors.colorBlack }}>
                    <Body style={{ marginLeft: 40, }}>
                        <Title>Post My Requirement </Title>
                    </Body>
                    <Right />
                </Header> */}

                <Body style={styles.container}>
                    <ScrollView>
                        <Text style={styles.label}> CLOTH SPECIFICATIONS: </Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ClothSpecificationsRoute', {
                            weight: this.state.weight,
                            panna: this.state.panna,
                            reed: this.state.reed,
                            peak:this.state.peak,
                            warp: this.state.warp,
                            weft: this.state.weft,
                            combedCarded: this.state.combedCarded,
                        })}
                            style={styles.clothspecsBox}>

                        </TouchableOpacity>

                        <Text style={styles.label}> EXPECTED RATE </Text>
                        <TextInput
                            style={styles.inputBox}
                            underLineColorAndroid='#000000'
                            placeholder="16"
                            placeholderTextColor='rgba(0,0,0,0.4)'
                            onChangeText={(text) => this.setState({ expectedRate: text })}
                        />

                        <Text style={styles.label}> EXPECTED DELIVERY DAYS: </Text>
                        <Picker
                            selectedValue={this.state.selectedExpectedDelivery}
                            style={styles.pickerStyle}
                            mode='dropdown'
                            onValueChange={(itemValue) => this.setState({ selectedExpectedDelivery: itemValue })}
                        >
                            <Picker.Item label="Select" value="None" />
                            <Picker.Item label="Within 2 days" value="within2days" />
                            <Picker.Item label="Within 4 days" value="within4days" />
                            <Picker.Item label="Within 7 days" value="within7days" />
                        </Picker>

                        <Text style={styles.label}> CLOSE REQUEST IN </Text>
                        <Picker
                            selectedValue={this.state.selectedCloseRequest}
                            style={styles.pickerStyle}
                            mode='dropdown'
                            onValueChange={(itemValue) => this.setState({ selectedCloseRequest: itemValue })}
                        >
                            <Picker.Item label="Select" value="48" />
                            <Picker.Item label="8 hours" value="8" />
                            <Picker.Item label="16 hours" value="16" />
                            <Picker.Item label="1 day" value="24" />
                        </Picker>

                        <Text style={styles.label}> REMARKS </Text>
                        <TextInput
                            style={styles.inputBox}
                            underLineColorAndroid='#000000'
                            onChangeText={(text) => this.setState({ remarks: text })}
                        />
                        <Button
                            style={styles.button}
                            onPress={this.skipPressed}
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
