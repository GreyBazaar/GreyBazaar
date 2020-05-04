import React, { Component } from "react";
import { ImageBackground, View, StatusBar, Dimensions, Platform, Picker, StyleSheet, TextInput, Alert } from "react-native";
import { Container, Button, H3, Text, Header, Left, Right, Body, Title, } from "native-base";
import colors from '../../assets/colors'
const deviceHeight = Dimensions.get("window").height;


export default class PostMyQuoteClothSpecifications extends Component {

    state = {
        weight: '',
        panna: '',
        reed: '',
        peak: '',
        warp: '',
        weft: '',
        combedCarded: '',
        clothSpecificationsFilled: false,
    }


    savePressed = () => {
        Alert.alert('Saved!')
        this.props.navigation.navigate('PostMyQuoteScreen2', {
            weight: this.state.weight,
            panna: this.state.panna,
            reed: this.state.reed,
            peak: this.state.peak,
            warp: this.state.warp,
            weft: this.state.weft,
            combedCarded: this.state.combedCarded,
            clothSpecificationsFilled: true,
        })
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

                    <View style={styles.eachRow}>
                        <Text style={styles.label}> WEIGHT (gms) </Text>
                        <TextInput
                            style={styles.inputBox}
                            underLineColorAndroid='#000000'
                            onChangeText={(text) => this.setState({ weight: text })}
                        />
                    </View>

                    <View style={styles.eachRow}>
                        <Text style={styles.label}> PANNA </Text>
                        <TextInput
                            style={styles.inputBox}
                            underLineColorAndroid='#000000'
                            onChangeText={(text) => this.setState({ panna: text })}
                        />
                    </View>

                    <View style={styles.eachRow}>
                        <Text style={styles.label}> REED </Text>
                        <TextInput
                            style={styles.inputBox}
                            underLineColorAndroid='#000000'
                            onChangeText={(text) => this.setState({ reed: text })}
                        />
                    </View>

                    <View style={styles.eachRow}>
                        <Text style={styles.label}> PEAK </Text>
                        <TextInput
                            style={styles.inputBox}
                            underLineColorAndroid='#000000'
                            onChangeText={(text) => this.setState({ peak: text })}
                        />
                    </View>

                    <View style={styles.eachRow}>
                        <Text style={styles.label}> WARP </Text>
                        <TextInput
                            style={styles.inputBox}
                            underLineColorAndroid='#000000'
                            onChangeText={(text) => this.setState({ warp: text })}
                        />
                    </View>

                    <View style={styles.eachRow}>
                        <Text style={styles.label}> WEFT </Text>
                        <TextInput
                            style={styles.inputBox}
                            underLineColorAndroid='#000000'
                            onChangeText={(text) => this.setState({ weft: text })}
                        />
                    </View>


                    <View style={styles.eachRow}>
                        <Text style={styles.label}> COMBED / CARDED </Text>
                        <Picker
                            selectedValue={this.state.combedCarded}
                            style={styles.pickerStyle}
                            mode='dropdown'
                            onValueChange={(itemValue) => this.setState({ combedCarded: itemValue })}
                        >
                            <Picker.Item label="Select" value="None" />
                            <Picker.Item label="Combed" value="combed" />
                            <Picker.Item label="Carded" value="carded" />
                        </Picker>
                    </View>

                    <Button
                        style={styles.button}
                        onPress={this.savePressed}
                    >
                        <Text style={styles.skipFont}>SAVE</Text>
                    </Button>

                </Body>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
    },
    eachRow: {
        marginVertical: 14,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    label: {
        color: colors.colorWhite,
        justifyContent: 'center',
        textAlignVertical: 'center',
        fontSize: 14,
        flex: 0.3
    },
    inputBox: {
        flex: 0.6,
        alignSelf: 'flex-end',
        width: 200,
        height: 50,
        backgroundColor: colors.colorShadow,
        fontSize: 16,
    },
    pickerStyle: {
        flex: 0.6,
        width: 200,
        height: 50,
        backgroundColor: colors.colorShadow,
    },
    skipFont: {
        color: colors.colorBlack,
    },
    button: {
        alignItems: 'center',
        backgroundColor: colors.colorWhite,
        marginTop: 40,
        borderRadius: 10,
        alignSelf: 'flex-end',
    },
})
