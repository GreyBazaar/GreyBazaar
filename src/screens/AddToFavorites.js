import React from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import colors from '../../assets/colors'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Item, Input, CheckBox, Card, CardItem, Content, Thumbnail, Grid, Button, Subtitle } from 'native-base'
import { Container, H3, Header, Left, Right, Body, Title, } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';



Array.prototype.unique = function () {
    return Array.from(new Set(this));
}

export default class AddToFavorites extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            //db: firebase.firestore(),
            data: [],
            search: '',
            displayData: [],
            favs: [],
            favData: [],
            documentData: [],
            limit: 9,
            lastVisible: null,
            loading: false,
            refreshing: false,
            notfirstTime: true,
            direct: 'false',
            visible: false,
            checked: true,
            refreshed: false,
            fav_sellers: [],
            email: ''

        }

    }

    componentDidMount() {

        const user = auth().currentUser
        this.setState({ email: user.email })
        console.log("on addToFav screen")
        this.retrieveData()

    }

    renderFooter = () => {
        try {
            // Check If Loading
            if (this.state.loading) {
                return (
                    <View style={{ flex: 1, justifyContent: 'center', marginTop: 300 }}>
                        <ActivityIndicator size="large" color="#1a237e" />
                    </View>
                )
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.log(error);
        }
    };






    static navigationOptions = {
        headerShown: false
    }

    retrieveData = async () => {
        try {
            // Set State: Loading
            this.setState({
                loading: true,
                direct: false
            });
            console.log('Retrieving Data from collection Seller ');
            // Cloud Firestore: Query
            let initialQuery = await firestore().collection('Seller')


                .limit(this.state.limit)

            firestore.setLogLevel('debug')
            firestore()
            // Cloud Firestore: Query Snapshot
            let documentSnapshots = await initialQuery.get();
            // Cloud Firestore: Document Data
            let documentData = documentSnapshots.docs.map(document => document.data());
            // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
            //let lastVisible = documentData[documentData.length - 1].id;
            // Set State
            console.log(documentData)
            this.setState({
                documentData: documentData,
                //lastVisible: lastVisible,
                loading: false,
            });
        }
        catch (error) {
            console.log('error isss : ', error);
            this.setState({ loading: false, direct: true })

        }
    };
    // Retrieve More
    retrieveMore = async () => {
        try {
            // Set State: Refreshing
            this.setState({
                refreshing: true,
            });
            console.log('Retrieving additional Data');
            // Cloud Firestore: Query (Additional Query)
            let additionalQuery = await firestore().collection('Seller')
                .startAfter(this.state.lastVisible)
                .limit(this.state.limit)

            // Cloud Firestore: Query Snapshot
            let documentSnapshots = await additionalQuery.get();
            // Cloud Firestore: Document Data
            let documentData = documentSnapshots.docs.map(document => document.data());
            // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
            let lastVisible = documentData[documentData.length - 1].id;
            // Set State
            this.setState({
                documentData: [...this.state.documentData, ...documentData],
                lastVisible: lastVisible,
                refreshing: false,
            });
        }
        catch (error) {
            console.log("error is :", error);
        }
    };

    isChecked = (hey) => {
        let data = this.state.fav_sellers
        /*let selected_data = this.state.selected_sellers
        var data = this.state.documentData.map(e => {
            if (item.name === e.name) {
                item.checked = !e.checked;


                //item.color = '#f8bbd0'
                selected_data.push(item.email)
                //selected_data = this.state.selected_sellers.map(item => item.email)

                //console.log(e.id)
                //console.log(item.color)


                return item;

            }
            else {
                //console.log(data)
                return e;
            }

        });
        console.log('checked dtaa is ', this.state.selected_sellers)
        this.setState({ documentData: data, fav_sellers: selected_data })*/
        //item.color = 'white'

        this.state.documentData.map((item) => {
            if (item.email === hey.email) {
                item.check = !item.check
                if (item.check === true) {
                    data.push(item);
                    console.log('selected:' + item.name);
                } else if (item.check === false) {
                    const i = data.indexOf(item)
                    if (i > -1) {
                        this.state.data.splice(i, 1)
                        console.log('unselect:' + item.name)
                        return data
                    }
                }
            }
        })
        //console.log()
        console.log(this.state.fav_sellers)
        this.setState({ fav_sellers: data, documentData: this.state.documentData })
    }


    handleChange = async (search) => {
        let Data = []
        this.setState({ displayData: [] })
        try {
            this.setState({ loading: true })
            console.log('searching for ', search)
            await firestore().collection('Users')
                .where('keywords', 'array-contains', search)
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                        Data.push(doc.data());


                    });
                })
            console.log(Data)
            this.setState({
                //documentData: Data,
                displayData: Data,
                loading: false,

            }, console.log("This is the data we are looking for : " + this.state.displayData));
            //Data=[]



        }

        catch (error) {
            console.log(error);
        }
    }


    handleCreate = (item) => {
        firestore().collection('Buyer').doc(this.state.email).collection('MyFavorites').doc(item.email).set({
            name: item.name,
            email: item.email,
            gstn: item.gstn,
            company_name: item.company_name


        })
            .then(() => console.log("doc added successfully"))
            .catch(function (error) {
                console.log("error adding ", error);
            });
    }


    doneSelect = () => {
        let data = this.state.fav_sellers
        console.log('fav data hai ', data)
        console.log(data.length)
        for (let i = 0; i < data.length; i++)
            this.handleCreate(data[i])
        /*data.forEach(function(item) {
            console.log(item)
            this.handleCreate(item)
            
            then(() => console.log("doc added successfully"))
        .catch(function(error) {
            console.log("error adding ", error);
        });
        })*/
    }

    render() {
        console.disableYellowBox = true
        var { navigate } = this.props.navigation;
        return (




            <SafeAreaView style={styles.container}>

                <Header searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search for sellers"
                        //onChangeText={(search) => this.handleChange(search)}
                        />
                        <Icon name="ios-people" />
                    </Item>
                    <Button transparent>
                        <Text>Search </Text>
                    </Button>

                </Header>

                <Text style={styles.heading}>Tap on the + to add to favourites</Text>

                <FlatList
                    scrollEnabled={true}
                    // Data
                    data={this.state.documentData}

                    // Render Items
                    renderItem={({ item }) => (

                        //this.checkDate(item.day,item.event_name),
                        <View style={{
                            borderColor: '#f48fb1',
                            margin: 10,
                            borderWidth: 1,
                             
                        }}>
                            <TouchableOpacity onPress={() => this.isChecked(item)}>

                                <View style={{ flexDirection: 'column' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' , }}>
                                        <View>
                                        <Text style={styles.text1}>{item.name}</Text>
                                        <Text style={styles.text1}>{item.company_name}</Text>
                                        </View>
                                        {!item.check ? (
                                            <Icon style={{ margin: 14, alignSelf: 'stretch', flexDirection: 'column' , paddingTop:20 }}
                                                name="star-o"
                                                size={30}
                                                color='#f8bbd0'
                                            />
                                        ) : (
                                                <Icon style={{ margin: 14, alignSelf: 'stretch', flexDirection: 'column' ,paddingTop:20 }}
                                                    name="star"
                                                    size={30}
                                                    color='#f8bbd0'
                                                />
                                            )}
                                    </View>
                                    



                                </View>
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
                    //onEndReached={this.retrieveMore}
                    // How Close To The End Of List Until Next Data Request Is Made
                    onEndReachedThreshold={0}
                    // Refreshing (Set To True When End Reached)
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}

                />

                <TouchableOpacity
                    onPress={() => {
                        this.doneSelect()
                        this.props.navigation.navigate('Favorites')
                    }}
                    style={styles.button}
                >
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.colorBlue, alignSelf: 'center' }}>DONE</Text>
                </TouchableOpacity>

            </SafeAreaView>

        );



    }

}

const styles = StyleSheet.create({

    box: {
        borderColor: '#f48fb1',
        margin: 10,
        borderWidth: 1,

    },
    container: {
        flex: 1,
        backgroundColor: colors.colorBlue
    },
    text1: {
        color: 'white',
        fontSize: 20,
        margin: 10,
       },
    heading: {
        fontSize: 18,
        color: colors.colorGrey,
        margin: 15,

        alignSelf: 'center'
    },
    button: {
        borderRadius: 9,
        borderWidth: 1,
        borderColor: '#ec407a',
        backgroundColor: '#f8bbd0',
        alignSelf: 'center',
        alignContent: 'center',
        height: 35,
        width: 100,
        marginBottom: 15,
        justifyContent: 'center'
    }

})