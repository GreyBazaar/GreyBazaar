import React from 'react';
import { Root } from "native-base";
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import colors from '../assets/colors'

import SideBar from "./util/sidebar";
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import CompanyDetails from './screens/CompanyDetails'
import HomeScreen from './screens/HomeScreen'
import MyWalletScreen from './screens/MyWalletScreen'
import ShareAppScreen from './screens/ShareAppScreen'
import AboutUsScreen from './screens/AboutUsScreen'
import LogoutScreen from './screens/LogoutScreen'
import HelpAndSupportScreen from './screens/HelpAndSupportScreen'
import PostMyRequirementScreen1 from './screens/PostMyRequirementScreen1'
import PostMyRequirementScreen2 from './screens/PostMyRequirementScreen2'
import ClothSpecificationsScreen from './screens/ClothSpecificationsScreen'
import SendRequirementToScreen from './screens/SendRequirementToScreen'
import MyRequests from './screens/MyRequests'
import ViewQuotes from './screens/ViewQuotes'
import AcceptConfirm from './screens/AcceptConfirm'
import QualitySpecs from './screens/QualitySpecs'
import PastRequests from './screens/PastRequests'
import Choice from './screens/Choice'
import SellerHomeScreen from './screens/SellerHomeScreen'


const RequestNavigator = createMaterialTopTabNavigator({
 
  active : {
    screen : MyRequests,
    navigationOptions: {title: 'Active',}
  },
  past :{
    screen : PastRequests,
    navigationOptions: {title: 'Past', }
  },
  
  },
  {
  initialRouteName : 'active',
  tabBarOptions: {activeTintColor: 'white',
                  inactiveColor: '#9e9e9e', showIcon: 'true',
                  style: { backgroundColor: colors.colorBlue, marginBottom: 20},
                  labelStyle: {fontSize:20,textTransform:'capitalize', textAlign:'center',paddingBottom:25},
                  tabStyle:{height:58, justifyContent:'center', alignItems:'center',alignContent:'center'},
                  iconStyle: {inactiveColor:'grey'}
                  ,indicatorStyle: {height:4, backgroundColor: '#f48fb1'}
//pressColor:'blue'

  
                },
  //order : ['home','event_main','notifs','profile'],
    
  }
)


const RequirementStack = createStackNavigator({
  PostMyRequirementRoute1 : PostMyRequirementScreen1,
  PostMyRequirementRoute2: PostMyRequirementScreen2,
  ClothSpecificationsRoute: ClothSpecificationsScreen,
  SendRequirementToRoute : SendRequirementToScreen,
},
{
  initialRouteName:'PostMyRequirementRoute1',
  // headerMode: "none"
})

const RequestsStack = createStackNavigator({
  RequestNavigator: {screen :RequestNavigator, 
                      navigationOptions:{
                        title: 'MY REQUESTS', 
                        headerTitleAlign:"center",
                        headerStyle: {
                          //backgroundColor: 'blue',
                          //fontSize: 40,
                        
                         
                        },
                        headerTitleStyle:{
                          fontSize: 25,
                          
                        }
                      }},
  ViewQuotes: {screen : ViewQuotes,
                navigationOptions: {
                  title: 'VIEW QUOTES',
                  headerTitleAlign:'center',
                  headerTitleStyle:{
                    fontSize: 25,
                    
                  },
                  
                  
                }},
  AcceptConfirm: {screen : AcceptConfirm,
    navigationOptions: {
      title: 'CONFIRMATION',
      headerTitleAlign:'center',
      headerTitleStyle:{
        fontSize: 25,
        
      },
      
    }},
  QualitySpecs: {screen : QualitySpecs,
    navigationOptions: {
      title: 'Quality Specifications',
      headerTitleAlign:'center',
      headerTitleStyle:{
        fontSize: 25,
        
      },
      
    }}

},
{
  initialRouteName: 'RequestNavigator',
  //headerMode: 'none'
})



const HomeStack = createSwitchNavigator({
  HomeScreenRoute: HomeScreen,
  RequirementsRoute: RequirementStack,
  RequestsRoute: RequestsStack

},
{
  initialRouteName: "HomeScreenRoute", 
  headerMode: "none"
})

const SellerHomeStack = createSwitchNavigator({
  SellerHomeScreenRoute: SellerHomeScreen,
})

const ChoiceStack = createSwitchNavigator({
  Choice: Choice,
  HomeRoute: HomeStack,
  SellerHomeRoute: SellerHomeStack,
},
{
  initialRouteName: 'Choice'
})


const Drawer = createDrawerNavigator(
  {
    ChoiceRoute: ChoiceStack,
    //HomeRoute: HomeStack,
    //SellerHomeRoute: SellerHomeStack,
    MyWalletRoute: { screen: MyWalletScreen },
    ShareAppRoute: { screen: ShareAppScreen },
    AboutUsRoute: { screen: AboutUsScreen },
    LogoutRoute: { screen: LogoutScreen },
    HelpAndSupportRoute: { screen: HelpAndSupportScreen },
  },
  {
    initialRouteName: "ChoiceRoute", //TODO: CHANGE TO HomeScreen
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
    contentComponent: props => <SideBar {...props} /> //design of the sidebar, name of tabs
  }
);









const AppNavigator = createSwitchNavigator(
  {
    Drawer: { screen: Drawer },
    LoginRoute :{ screen: LoginScreen},
    SignUpRoute : {screen: SignUpScreen},
    CompanyDetailsRoute : { screen : CompanyDetails}
  },
  {
    initialRouteName: "LoginRoute", 
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default () =>
  <Root>
    <AppContainer />
  </Root>;