import React from 'react';
import { Text, StyleSheet, Image} from 'react-native';
import auth from '@react-native-firebase/auth'
import { View } from 'native-base';
import OneSignal from 'react-native-onesignal'

export default class SplashScreen extends React.Component{
    constructor(props){
        super(props)
        OneSignal.init('aa270cf7-3229-4d73-a179-8b2ed2dec3cb')            
    }
    componentDidMount = async() =>{
        console.log("starting")
        auth().onAuthStateChanged((user) => {
            if (user) {
              setTimeout(
              () => this.props.navigation.navigate('Divider',{
                  email : user.email
              }),
              1000
              )
            }else{
                setTimeout(
                () => this.props.navigation.navigate('LoginRoute'),
                1000
                )
            }
         });
    }
render(){
    return(
        <View style={{flex:1 , justifyContent: 'center' , alignItems:'center'}}>
            <Image 
                source = {require('../images/logo1.jpg')}
                style = {{height:250 , width:250}}
            />
            <Text style={style.text}>Welcome To</Text>
            <Text style={style.text}>GreyBazaar</Text>
        </View>
)}
}
const style = StyleSheet.create({
    text:{
        color:'black',
        fontSize:50,
        textAlign:'center'
    }
})