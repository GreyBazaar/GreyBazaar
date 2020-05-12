import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, ActivityIndicator, YellowBox } from 'react-native'
import colors from '../../assets/colors'
import firestore from '@react-native-firebase/firestore';

export default class OrderSummarySeller extends React.Component {

    


    constructor(props) {
        super(props);
        this.state = {
            email: '',
            reqID: '',
            qualityType: '',
            quantity: '',
            rate: 0,
            deliveryDays: 0,
        }
    }

    componentDidMount() {
        const {state} = this.props.navigation;
        let reqID = state.params.reqID
        let email = state.params.email
        let quoteId = state.params.quoteId
        console.log(reqID, 'qid   ',quoteId)
        this.setState({
            reqID: state.params.reqID,
            quantity: state.params.quantity,
            qualityType: state.params.qualityType,
            email: state.params.email,
            
        })

        
            console.log('Summary of seller')
try{
             firestore().collection('Seller').doc(email).collection('RequestToSeller').doc(reqID).collection('MyQuote').doc(quoteId)
            .onSnapshot(documentSnapshot => {
              console.log('User data: ', documentSnapshot.data());
              this.setState({
                  rate:documentSnapshot.data().rate,
                  deliveryDays:documentSnapshot.data().deliveryDays
              })
            })
            .then(console.log('great'))}

            catch (error) {
                console.log(error)
            }
            
   

    }

    render() {
        return (
            <SafeAreaView style = {styles.container}>
                
                
                <View style = {styles.para}>
                    <Text style = {styles.paragraph}>Hi Seller,
                        {'\n\n'}You are about to confirm your deal with Buyer.
                        {'\n\n'}Kindly check the details and click on submit
                        {'\n\n'}Quality: {this.state.qualityType}
                        {'\n\n'}Quantity: {this.state.quantity}
                        {'\n\n'}Rate: {this.state.rate}
                        {'\n\n'}Delivery Days: {this.state.deliveryDays}
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