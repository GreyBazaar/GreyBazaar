import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, ActivityIndicator, YellowBox } from 'react-native'

import * as firebase from 'firebase/app'
import 'firebase/firestore'
import colors from '../../assets/colors'


export default class AcceptConfirm extends React.Component {

    static navigationOptions = {
        title: 'Accept And Confirm',
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
            reqID: '',
            qualityType: '',
            quantity: '',

        }
    }

    render() {
        return (
            <SafeAreaView style = {styles.container}>
                
                
                <View style = {styles.para}>
                    <Text style = {styles.paragraph}>Hi Buyer,
                        {'\n\n'}You are about to confirm your deal with Seller1.
                        {'\n\n'}Kindly check the details and click on submit
                        {'\n\n'}Quality: 52 x 52
                        {'\n\n'}Quantity: 100
                        {'\n\n'}Rate: 16.00
                        {'\n\n'}Delivery Days: 4
                        {'\n\n'}Delivery at (Process): 
                    </Text>
                </View>
                <TouchableOpacity
                style = {styles.button}
                 //onPress = {() => this.props.navigation.goBack()}>
                 >
                    <Text style = {{color: "white", fontSize : 14}}>SUBMIT</Text>
                </TouchableOpacity>

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent:'space-around'
    },
    header: {
        alignSelf: "center",
        fontSize: 40,
        fontStyle: "italic",
        //flexDirection: 'row',
        marginBottom: 20,
        marginTop: 20
    },
    para: {
        marginLeft: 15,
        
    },
    paragraph: {
        padding: 5,
        fontSize: 17
    },
    button: {
        //marginHorizontal: 30,
        backgroundColor: colors.colorBlue,
        borderRadius: 8,
        height: 42,
        justifyContent:"center",
        alignItems:"center",
       width: 100,
       alignSelf: 'center',
       marginBottom: 20,
       marginTop:20
       
    },
})