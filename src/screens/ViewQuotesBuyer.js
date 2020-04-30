import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TouchableHighlight, FlatList, ActivityIndicator, YellowBox } from 'react-native'
import { Container, Button, H3, Header, Left, Right, Body } from "native-base";
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import colors from '../../assets/colors'
import { Title } from 'react-native-paper'


export default class ViewQuotesBuyer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            reqID: '',
            qualityType: '',
            quantity: '',
            documentData: [
                {
                    id: 1, qualityType: '52x52', rate: 'Rs. 16.00', days: 4,
                    color: 'white', checked: false
                },
                {
                    id: 2, qualityType: '52x52', rate: 'Rs. 15.50', days: 6,
                    color: 'white', checked: false
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


        }
    }


    isChecked = (item) => {

        var data = this.state.documentData.map(e => {
            if (item.id === e.id) {
                item.checked = !e.checked;
                item.color = '#f8bbd0'
                //console.log(e.id)
                //console.log(item.color)

                return item;

            }
            else {
                //console.log(data)
                return e;
            }

        });
        this.setState({ documentData: data })

    }


    render() {
        // <NavigationEvents onDidFocus={() => console.log('I am triggered')} />
        console.disableYellowBox = true
        //console.log(today.format('MMMM Do YYYY, h:mm A'))
        //console.log(this.state.documentData)

        return (
            <SafeAreaView style={styles.container}>

                <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'space-evenly', paddingTop: 20 }}>
                    <TouchableOpacity style={styles.button2} >
                        <Text style={{ color: 'white' }}>SORT BY</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2}>
                        <Text style={{ color: 'white' }}>FILTER</Text>
                    </TouchableOpacity>
                </View>
                {(!this.state.direct) ? <FlatList
                    // Data
                    data={this.state.documentData}

                    // Render Items
                    renderItem={({ item, index, }) => (

                        //this.checkDate(item.day,item.event_name),

                        <View style={{
                            borderColor: colors.colorBlue,
                            margin: 10,
                            borderWidth: 1, backgroundColor: item.color
                        }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginEnd: 10 }}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={styles.boxText2}>SELLER {item.id}</Text>
                                    <Text style={styles.boxText2}>RATE: Rs. {item.rate}</Text>
                                    <Text style={styles.boxText2}>DELIVERY DAYS: {item.days}</Text>
                                </View>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={styles.boxText2}>QUALITY: {item.qualityType}</Text>
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('QualitySpecs')}

                                        style={{ backgroundColor: colors.colorGrey, width: 150, marginBottom: 10, marginTop: 7, borderWidth: 5, borderColor: colors.colorShadow }}
                                    >
                                        <Text style={{ color: 'black', alignSelf: 'center', textAlign: 'center' }}>QUALITY SPECIFICATIONS</Text>
                                    </TouchableOpacity>

                                </View>


                            </View>
                            <View style={{ flexDirection: 'row', alignContent: 'flex-end', justifyContent: 'flex-end' }}>
                                {(!item.checked) ?
                                    <TouchableOpacity

                                        style={styles.button2}
                                        onPress={() => this.isChecked(item)}


                                    >
                                        <Text style={{ textAlign: 'center', color: 'white' }}>ACCEPT</Text>
                                    </TouchableOpacity> :
                                    <TouchableOpacity

                                        style={styles.button3}
                                        onPress={() => this.props.navigation.navigate('AcceptConfirm')}


                                    >
                                        <Text style={{ textAlign: 'center', color: 'white' }}>CONFIRM ORDER</Text>
                                    </TouchableOpacity>

                    }

                                    <TouchableOpacity
                                    style={styles.button2}
                                //onPress = {() => this.setState ({ bordercolor: '#4fc3f7' , borderwidth: 8, disable_shortlist:true})}


                                >
                                    <Text style={{ textAlign: 'center', color: 'white' }}>CHAT</Text>
                                </TouchableOpacity>
                            </View>
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


            </SafeAreaView>
        );
    }


}

const styles = StyleSheet.create({

    button: {
        //marginHorizontal: 30,
        backgroundColor: colors.colorBlue,
        borderRadius: 8,
        height: 42,
        justifyContent: "center",
        alignItems: "center",
        width: 100,
        alignSelf: 'center',
        marginBottom: 20

    },
    button2: {
        //marginHorizontal: 30,
        backgroundColor: colors.colorBlue,
        borderRadius: 0,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        width: 100,
        alignSelf: 'center',
        marginBottom: 10,
        elevation: 20,
        marginLeft: 50,
        marginRight: 10


    },
    button3: {
        //marginHorizontal: 30,
        backgroundColor: colors.colorBlue,
        borderRadius: 0,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        width: 125,
        alignSelf: 'center',
        marginBottom: 10,
        elevation: 20,
        marginLeft: 90,
        //marginRight: 10
        


    },
    container: {
        flex: 1,


    },
    header: {
        alignSelf: "center",
        fontSize: 32,
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