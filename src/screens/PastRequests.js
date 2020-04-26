import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, ActivityIndicator, YellowBox } from 'react-native'

import * as firebase from 'firebase/app'
import 'firebase/firestore'
import colors from '../../assets/colors'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';





export default class PastRequests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            id: 10,
            qualityType: '',
            quantity: '',
            date: '',
            request_close_at: '',
            send_to: '',
            request_name: '',

            db: firebase.firestore(),

            documentData: [
                {
                    id:1090,date:'20/2/19',qualityType: '52x52',quantity:'100 TAKA',send_to:'All sellers',request_close_at:'12:30 pm'
                },
                 

            ],
            limit: 9,
            lastVisible: null,
            loading: false,
            refreshing: false,
            notfirstTime: true,
            direct: false,
            visible: false,
            item: [],
           // displayData: []

        }
    }

    render() {
        // <NavigationEvents onDidFocus={() => console.log('I am triggered')} />
         console.disableYellowBox = true
         //console.log(today.format('MMMM Do YYYY, h:mm A'))
         //console.log(this.state.documentData)
 
         return (
             <SafeAreaView style={styles.container}>
 
 
                 {(!this.state.direct) ? <FlatList
                     // Data
                     data={this.state.documentData}
                     
                     // Render Items
                     renderItem={({ item }) => (
                         
                         //this.checkDate(item.day,item.event_name),
                 <View style = {styles.box}>
                     <Text style = {styles.boxText2, {marginStart:10,marginTop:10}}>REQUEST ID: {item.id}</Text>
                     <View style = {{flexDirection: 'row'}}>
                     <Text style = {styles.boxText2}>DATE: {item.date}</Text>
                         <Text style = {styles.boxText2,{paddingLeft:75}}>REQUEST CLOSED AT : {item.request_close_at}</Text>
                     </View>
                     <Text style = {styles.boxText2}>QUALITY TYPE: {item.qualityType}</Text>
                     <Text style = {styles.boxText2}>QUANTITY: {item.quantity}</Text>
                     <Text style = {styles.boxText2, {marginBottom:8,marginStart:10}}>SENT REQUIREMENT TO: {item.send_to}</Text>
                     <TouchableOpacity 
                         style = {styles.button2}
                         onPress = {() => this.props.navigation.navigate('ViewQuotes')}
                     >
                         <Text style = {styles.boxText}>VIEW QUOTES</Text>
                     </TouchableOpacity>
                 </View>
 
                     )}
                     // Item Key
                     keyExtractor={(item, index) => String(index)}
                     // Header (Title)
                     ListHeaderComponent={this.renderHeader}
                     // Footer (Activity Indicator)
                     ListFooterComponent={this.renderFooter}
                     // On End Reached (Takes a function)
                     onEndReached={this.retrieveMore}
                     // How Close To The End Of List Until Next Data Request Is Made
                     onEndReachedThreshold={0}
                     // Refreshing (Set To True When End Reached)
                     refreshing={this.state.refreshing}
                 /> : <View
                     style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                         <Text style={{ fontWeight: 'bold', fontSize: 25 }}>NO REQUESTS</Text>
                         
                     </View>}
 
                     <TouchableOpacity
                 style = {styles.button}
                  onPress = {() => this.props.navigation.navigate('HomeScreenRoute')}>
                     <Text style = {{color: "white", fontSize : 14}}>BACK</Text>
                 </TouchableOpacity>      
                 
             </SafeAreaView>
         );
     }
 
}


const styles = StyleSheet.create({

    button: {
        //marginHorizontal: 30,f
        
        backgroundColor: colors.colorBlue,
        borderRadius: 8,
        height: 42,
        justifyContent:"center",
        alignItems:"center",
       width: 100,
       alignSelf: 'center',
       marginBottom: 20
       
    },
    button2: {
        //marginHorizontal: 30,
        backgroundColor: colors.colorBlue,
        borderRadius: 0,
        height: 32,
        justifyContent:"center",
        alignItems:"center",
       width: 100,
       alignSelf: 'center',
       marginBottom: 10,
       elevation: 20,
       
       
    },
    container: {
      flex:1,
      
      
    },
    header: {
        alignSelf: "center",
        fontSize: 40,
        fontStyle: "italic",
        //flexDirection: 'row',
        marginBottom: 20,
        marginTop: 20
    },
    box: {
        borderColor: colors.colorBlue,
        margin: 10,
        borderWidth: 1
    },
    boxText: {
        color: 'white'
    },
    boxText2: {
        color: colors.colorBlue,
        marginLeft: 10,
    
    }
  })