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
// import {decode, encode} from 'base-64'

// if (!global.btoa) {  global.btoa = encode }
// if (!global.atob) { global.atob = decode }

const Drawer = createDrawerNavigator(
  {
    HomeScreenRoute: { screen: HomeScreen },
    MyWalletRoute: { screen: MyWalletScreen },
    ShareAppRoute: { screen: ShareAppScreen },
    AboutUsRoute: { screen: AboutUsScreen },
    LogoutRoute: { screen: LogoutScreen },
    HelpAndSupportRoute: { screen: HelpAndSupportScreen },
  },
  {
    initialRouteName: "HomeScreenRoute", //TODO: CHANGE TO HomeScreen
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
    initialRouteName: "LoginRoute", //TODO :change to signup screen
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default () =>
  <Root>
    <AppContainer />
  </Root>;


/*export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
*/