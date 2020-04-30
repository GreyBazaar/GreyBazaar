import firestore from '@react-native-firebase/firestore'
import React from 'react'
import {ActivityIndicator , View} from 'react-native'

export default class Divider extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email: this.props.navigation.getParam('email', 'random@gmail.com'), 
        }
    }
    componentDidMount(){
        firestore().collection('Users').doc(this.state.email).onSnapshot(querySnapshot =>{
            if(querySnapshot.data().type == 'Buyer'){
                this.props.navigation.navigate('HomeRoute')
            }
            else{
                this.props.navigation.navigate('SellerHomeRoute')
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