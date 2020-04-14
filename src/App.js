import React from 'react';
import { Root } from "native-base";
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

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
import Favorites from '../src/screens/Favorites.js'
import Profiles from '../src/screens/Profiles.js'
import SearchProfiles from '../src/screens/SearchProfiles.js'


const RequirementStack = createStackNavigator({
  PostMyRequirementRoute1 : PostMyRequirementScreen1,
  PostMyRequirementRoute2: PostMyRequirementScreen2,
  ClothSpecificationsRoute: ClothSpecificationsScreen,
  SendRequirementToRoute : SendRequirementToScreen,
  Favorites : Favorites,
  Profiles: Profiles,
  SearchProfiles : SearchProfiles
},
{
  initialRouteName:'PostMyRequirementRoute1',
  // headerMode: "none"
})


const HomeStack = createSwitchNavigator({
  HomeScreenRoute: HomeScreen,
  RequirementsRoute: RequirementStack,

},
{
  initialRouteName: "HomeScreenRoute", 
  headerMode: "none"
})



const Drawer = createDrawerNavigator(
  {
    HomeRoute: HomeStack,
    MyWalletRoute: { screen: MyWalletScreen },
    ShareAppRoute: { screen: ShareAppScreen },
    AboutUsRoute: { screen: AboutUsScreen },
    LogoutRoute: { screen: LogoutScreen },
    HelpAndSupportRoute: { screen: HelpAndSupportScreen },
  },
  {
    initialRouteName: "HomeRoute", //TODO: CHANGE TO HomeScreen
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
    initialRouteName: "Drawer", 
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default () =>
  <Root>
    <AppContainer />
  </Root>;