import React from 'react'
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet } from 'react-native'
import colors from '../../assets/colors'
import AsyncStorage from '@react-native-community/async-storage'
// import firebase from 'react-native-firebase'

export default class Choice extends React.Component {
    
    Navigate = async(type) => {
        await AsyncStorage.setItem('type' , type)
        this.props.navigation.navigate('SignUpScreenBuyer')
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text1}>ARE YOU A</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.Navigate('Buyer')}>
                        <Text style={styles.text2}>BUYER</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.Navigate('Seller')}
                    >
                        <Text style={styles.text2}>SELLER</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: 'center'
    },
    text1: {
        fontSize: 35,
        textAlign: 'center',
        fontWeight: "bold",
        marginBottom: 30,
        color: colors.colorBlue


    },
    text2: {
        fontSize: 25,
        //textAlign: 'center',
        fontWeight: "bold",
        color: 'white'


    },
    button: {
        //marginHorizontal: 30,
        backgroundColor: colors.colorBlue,
        borderRadius: 8,
        height: 52,
        justifyContent: "center",
        alignItems: "center",
        width: 120,
        alignSelf: 'center',
        marginBottom: 20

    },


})