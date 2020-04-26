
import React, { Component } from 'react';
import {  Body,  Container,  Header, Title, Right,} from 'native-base';
import {
  StyleSheet, ScrollView, View, Text, TouchableOpacity, TextInput,
} from 'react-native';
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import colors from '../../assets/colors'

class CompanyDetails extends Component {
    constructor(props){
        super(props)
        this.state = {
            name : '',
            gstn : '' ,
            add_1: '',
            visible : false,
            compname : '',
            add_2 : '' ,
            city : '',
            state : '',
            pincode : '',
            email : firebase.auth().currentUser.email,
            db : firebase.firestore(),
            type : this.props.navigation.getParam('type' , 'Buyer')
        }
    }
    componentDidMount = () => {
      const user = firebase.auth().currentUser
      console.log(user.buyer) 
    }
    fetchApi = async () => {
        // const response = await fetch('https://appyflow.in/api/verifyGST?gstNo='+this.state.gstn+'&key_secret=cqtiXFypuaPAgPtFUexLOx31igt1')
        // const result = await response.json()
        const info = {"adadr": [], "ctb": "Proprietorship", "ctj": "RANGE-V", "ctjCd": "VN0305", "cxdt": "", "dty": "Regular", "gstin": "27ADYPA9158L1ZP", "lgnm": "VIJAY GOVINDPRASAD AGARWAL", "lstupdt": "07/09/2019", "nba": ["Wholesale Business"], "panNo": "ADYPA9158L", "pradr": {"addr": {"bnm": "JAI HIND BUILDING", "bno": "3-C", "city": "", "dst": "Mumbai City", "flno": "1ST FLOOR", "lg": "", "loc": "MUMBAI", "lt": "", "pncd": "400002", "st": "BHULESHWAR", "stcd": "Maharashtra"}, "ntr": "Wholesale Business"}, "rgdt": "06/07/2017", "stj": "KALBADEVI_701", "stjCd": "MHCG0378", "sts": "Active", "tradeNam": "KAVERI SAREES"}    
        // const info = await result.taxpayerInfo
        console.log(info)
          this.setState({
              compname : info.tradeNam,
              visible:true,
              add_1 : info.pradr.addr.bno + ' , ' + info.pradr.addr.bnm,
              add_2 : info.pradr.addr.st + ' , ' + info.pradr.addr.loc,
              city : info.pradr.addr.city,
              state : info.pradr.addr.stcd,
              pincode: info.pradr.addr.pncd  
          })
  }
  addToDb = () => {
    // let arr = this.handleEventName(this.state.name)
    console.log('Add to DB')
    this.state.db.collection("Users").doc(this.state.email).set({
        name: this.state.name,
        address1: this.state.add_1,
        address12: this.state.add_2,
        email: this.state.email.toLowerCase(),
        image: '',
        // keywords: this.state.keywords,
        company_name : this.state.compname,
        city : this.state.city,
        state: this.state.state,
        pincode : this.state.pincode,
        gstn : this.state.gstn
        // OneSignalId : this.state.userId
    })
        .then(() => this.props.navigation.navigate('HomeRoute'))
        .catch((e) => console.log(e))

  }
  render() {
        return (
      <Container style={styles.container}>
        <Header style={{ backgroundColor: colors.colorBlack }}>
          <Body style={{ marginLeft: 40, }}>
            <Title>Login </Title>
          </Body>
          <Right />
        </Header>
        <ScrollView>
        {
        this.state.visible ?
        <View style={styles.innerContainer}>
          <Text style={styles.heading}>Sign Up</Text>

          <TextInput
            style={styles.inputBox}
            underLineColorAndroid='#000000'
            placeholderTextColor='rgba(0,0,0,0.4)'
            placeholder="Name"
            autoCapitalize='none'
            onChangeText={(text) => this.setState({ name: text })}
          />

          <TextInput
            style={styles.inputBox}
            underLineColorAndroid='#000000'
            placeholder="GSTN Number"
            placeholderTextColor='rgba(0,0,0,0.4)'
            autoCapitalize="none"
            onChangeText={(text) => this.setState({ gstn: text })}
          />
          <Text>Company Name</Text>
          <TextInput
            style={styles.inputBox}
            underLineColorAndroid='#000000'
            placeholder=""
            value = {this.state.compname}
            placeholderTextColor='rgba(0,0,0,0.4)'
            autoCapitalize="none"
            onChangeText={(text) => this.setState({ compname: text })}
          />
          <Text>Address Line 1</Text>
          <TextInput
            style={styles.inputBox}
            underLineColorAndroid='#000000'
            placeholder=""
            value = {this.state.add_1}
            placeholderTextColor='rgba(0,0,0,0.4)'
            autoCapitalize="none"
            onChangeText={(text) => this.setState({ add_1: text })}
          />
          <Text>Address Line 2</Text>
          <TextInput
            style={styles.inputBox}
            underLineColorAndroid='#000000'
            placeholder=""
            value={this.state.add_2}
            placeholderTextColor='rgba(0,0,0,0.4)'
            autoCapitalize="none"
            onChangeText={(text) => this.setState({ add_2: text })}
          />
          <Text>City</Text>
          <TextInput
            style={styles.inputBox}
            underLineColorAndroid='#000000'
            placeholder=""
            value = {this.state.city}
            placeholderTextColor='rgba(0,0,0,0.4)'
            autoCapitalize="none"
            onChangeText={(text) => this.setState({ city: text })}
          />
          <Text>State</Text>
          <TextInput
            style={styles.inputBox}
            underLineColorAndroid='#000000'
            placeholder=""
            value = {this.state.state}
            placeholderTextColor='rgba(0,0,0,0.4)'
            autoCapitalize="none"
            onChangeText={(text) => this.setState({ state: text })}
          />
          <Text>Pin Code</Text>
          <TextInput
            style={styles.inputBox}
            underLineColorAndroid='#000000'
            placeholder=""
            value = {this.state.pincode}
            placeholderTextColor='rgba(0,0,0,0.4)'
            autoCapitalize="none"
            onChangeText={(text) => this.setState({ pincode: text })}
          />
          
          <TouchableOpacity
            style={styles.button}
            onPress = { () => this.addToDb()}
          >
            <Text style={styles.buttonText}>Confirm Company Details</Text>
          </TouchableOpacity>
      
          {/* <Button
                    color="transparent"
                    title="Login "
                    onPress={() => this.props.navigation.navigate('LoginRoute')}
                /> */}
        </View> :
        <View style={styles.innerContainer}>
        <Text style={styles.heading}>Sign Up</Text>

        <TextInput
          style={styles.inputBox}
          underLineColorAndroid='#000000'
          placeholderTextColor='rgba(0,0,0,0.4)'
          placeholder="Name"
          autoCapitalize='none'
          onChangeText={(text) => this.setState({ name: text })}
        />

        <TextInput
          style={styles.inputBox}
          underLineColorAndroid='#000000'
          placeholder="GSTN Number"
          placeholderTextColor='rgba(0,0,0,0.4)'
          autoCapitalize="none"
          onChangeText={(text) => this.setState({ gstn: text })}
        />
        <TouchableOpacity
          style={styles.button}
          onPress = { () => this.fetchApi()}
        >
          <Text style={styles.buttonText}>Get Company Details</Text>
        </TouchableOpacity>
      </View>

  }
    </ScrollView>
      </Container>


    )
  }
}


export default CompanyDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
    // alignContent:'center',
    backgroundColor: colors.colorShadow,
  },
  heading: {
    color: colors.colorBlack,
    fontSize: 26,
    marginBottom: 10
  },
  inputBox: {
    marginVertical: 14,
    paddingHorizontal: 16,
    width: 300,
    height: 50,
    backgroundColor: colors.colorShadow,
    fontSize: 16,
    
    // borderRadius: 25,
  },
  buttonText:
  {
    fontSize: 18,
    alignContent: 'center',
    justifyContent: 'center',
    color: colors.colorWhite,
    textAlign: 'center'
  },
  horizontalLine: {
    borderBottomColor: colors.colorBlack,
    borderColor: colors.colorBlack,
    height: 0,
    width: 150,
    borderStyle: 'solid',
    margin: 10,
    borderBottomWidth: 1,
  },
  innerContainer: {
    // padding:10,
    margin: 20,
    paddingTop: 16,
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.colorWhite,
    // alignContent:'center',
    alignItems: 'center',
    // alignSelf:'center',
  },
  button:
  {
    paddingVertical: 15,
    paddingHorizontal: 15,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    width: 180,
    backgroundColor: colors.colorBlue,
  },
  loginText: {
    fontSize: 16,
    color: colors.colorBlack,
    textDecorationLine: 'underline',
  },
  lastText: {
    margin: 20,
    fontSize: 16,
  }
})
