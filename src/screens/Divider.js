import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import React from 'react'
import {ActivityIndicator , View} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

export default class Divider extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email: auth().currentUser.email, 
            type: '',
        }
    }
    componentDidMount = async() =>{
        firestore().collection('Users').doc(this.state.email).onSnapshot(async(querySnapshot) =>{
            console.log(querySnapshot)
            if(querySnapshot.data()){
                if(querySnapshot.data().type == 'Buyer')
                    this.props.navigation.navigate('HomeRoute')
                else
                    this.props.navigation.navigate('SellerHomeRoute')
            }
            else{
                const type = await  AsyncStorage.getItem('type')
                this.props.navigation.navigate('CompanyDetailsRoute', {
                    type: type,
                    email: this.state.email,
                })
            }
        })
    }

    render(){
        return (
            <View>
                <ActivityIndicator  size="large" color="#0000ff" />
            </View>
        )
    }
}