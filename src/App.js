import React from 'react';
import { Root } from "native-base";
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import colors from '../assets/colors'
import SideBar from "./util/sidebar";
import CompanyDetails from './screens/CompanyDetails'
import BuyerHomeScreen from './screens/BuyerHomeScreen'
import MyWalletScreen from './screens/MyWalletScreen'
import ShareAppScreen from './screens/ShareAppScreen'
import AboutUsScreen from './screens/AboutUsScreen'
import LogoutScreen from './screens/LogoutScreen'
import HelpAndSupportScreen from './screens/HelpAndSupportScreen'
import PostMyRequirementScreen1 from './screens/PostMyRequirementScreen1'
import PostMyRequirementScreen2 from './screens/PostMyRequirementScreen2'
import PostMyRequirementClothSpecifications from './screens/PostMyRequirementClothSpecifications'
import SendRequirementToScreen from './screens/SendRequirementToScreen'
import RequestsBuyer from './screens/ActiveRequestsBuyer'
import PastRequestsBuyer from './screens/PastRequestsBuyer'
import ViewQuotesBuyer from './screens/ViewQuotesBuyer'
import AcceptConfirm from './screens/OrderSummaryBuyer'
import QualitySpecs from './screens/QualitySpecs'
import Choice from './screens/Choice'
import SellerHomeScreen from './screens/SellerHomeScreen'
import LoginScreenBuyer from './screens/LoginScreenBuyer';
import SignUpScreenBuyer from './screens/SignUpScreenBuyer';
import Divider from './screens/Divider'
import RequestsSeller from './screens/ActiveRequestsSeller'
import PastRequestsSeller from './screens/PastRequestsSeller'
import SplashScreen from './screens/SplashScreen'
import PostMyQuoteScreen2 from './screens/PostMyQuoteScreen2'
import Favorites from './screens/Favorites'
import Profiles from './screens/Profiles'
import SearchProfiles from './screens/SearchProfiles'
import AddToFavorites from './screens/AddToFavorites'
import PostMyQuoteScreen1 from './screens/PostMyQuoteScreen1'
import PostMyQuoteClothSpecifications from './screens/PostMyQuoteClothSpecifications'
import OrderSummarySeller from './screens/OrderSummarySeller'



/* BUYER NAVIGATORS */


const RequestNavigatorBuyer = createMaterialTopTabNavigator({

  active: {
    screen: RequestsBuyer,
    navigationOptions: { title: 'Active', }
  },
  past: {
    screen: PastRequestsBuyer,
    navigationOptions: { title: 'Past', }
  },

},
  {
    initialRouteName: 'active',
    navigationOptions: {
      title: 'My Requests',
      headerStyle: {
        backgroundColor: colors.colorShadow,
      },
      headerTintColor: colors.colorBlack,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveColor: '#9e9e9e', showIcon: 'true',
      style: { backgroundColor: colors.colorBlue, marginBottom: 20 },
      labelStyle: { fontSize: 20, textTransform: 'capitalize', textAlign: 'center', paddingBottom: 25 },
      tabStyle: { height: 58, justifyContent: 'center', alignItems: 'center', alignContent: 'center' },
      iconStyle: { inactiveColor: 'grey' }
      , indicatorStyle: { height: 4, backgroundColor: '#f48fb1' }
    },

  }
)

const RequirementStack = createStackNavigator({
  PostMyRequirementRoute1: PostMyRequirementScreen1,
  PostMyRequirementRoute2: PostMyRequirementScreen2,
  ClothSpecificationsRoute: PostMyRequirementClothSpecifications,
  SendRequirementToRoute: SendRequirementToScreen,
  Favorites: Favorites,
  AddToFavorites: AddToFavorites,
  Profiles: Profiles,
  SearchProfiles: SearchProfiles,
},
  {
    initialRouteName: 'PostMyRequirementRoute1',
  
  })

const RequestsStackBuyer = createStackNavigator({
  RequestNavigatorBuyer:RequestNavigatorBuyer,
  ViewQuotes: ViewQuotesBuyer,
  AcceptConfirm: AcceptConfirm,
  QualitySpecs: QualitySpecs,
},
  {
    initialRouteName: 'RequestNavigatorBuyer',
    headerMode: 'screen',
  })

const BuyerHomeStack = createSwitchNavigator({
  HomeScreenRoute: BuyerHomeScreen,
  RequirementsRoute: RequirementStack,
  RequestsRoute: RequestsStackBuyer

},
  {
    initialRouteName: "HomeScreenRoute",
    headerMode: "none"
  })




/* SELLER NAVIGATORS*/

const RequestNavigatorSeller = createMaterialTopTabNavigator({

  active: {
    screen: RequestsSeller,
    navigationOptions: { title: 'Active', }
  },
  past: {
    screen: PastRequestsSeller,
    navigationOptions: { title: 'Past', }
  },

},
  {
    initialRouteName: 'active',
    navigationOptions: {
      title: 'New Requests',
      headerStyle: {
        backgroundColor: colors.colorShadow,
      },
      headerTintColor: colors.colorBlack,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveColor: '#9e9e9e', showIcon: 'true',
      style: { backgroundColor: colors.colorBlue, marginBottom: 20 },
      labelStyle: { fontSize: 20, textTransform: 'capitalize', textAlign: 'center', paddingBottom: 25 },
      tabStyle: { height: 58, justifyContent: 'center', alignItems: 'center', alignContent: 'center' },
      iconStyle: { inactiveColor: 'grey' }
      , indicatorStyle: { height: 4, backgroundColor: '#f48fb1' }

    },
  }
)


const RequestsStackSeller = createStackNavigator({
  RequestNavigatorSeller: RequestNavigatorSeller,
  OrderSummarySeller: OrderSummarySeller,
  PostMyQuoteScreen1: PostMyQuoteScreen1,
  PostMyQuoteScreen2: PostMyQuoteScreen2,
  PostMyQuoteClothSpecifications: PostMyQuoteClothSpecifications
},
  {
    headerMode: 'screen',
    initialRouteName: 'RequestNavigatorSeller',
  })

const SellerHomeStack = createSwitchNavigator({
  SellerHomeScreenRoute: SellerHomeScreen,
  RequestsRouteSeller: RequestsStackSeller,
},
  {
    initialRouteName: "SellerHomeScreenRoute",
    headerMode: "none"
  })

/* BuyerSeller Dividing Navigators*/
const BuyerSellerStack = createSwitchNavigator({
  BuyerHomeRoute: BuyerHomeStack,
  SellerHomeRoute: SellerHomeStack,
  Divider: Divider
},
)

/* COMMON NAVIGATOR */
const Drawer = createDrawerNavigator(
  {
    BuyerSellerStack: BuyerSellerStack,
    BuyerHomeRoute: BuyerHomeStack,
    SellerHomeRoute: SellerHomeStack,
    MyWalletRoute: MyWalletScreen,
    ShareAppRoute: ShareAppScreen,
    AboutUsRoute: AboutUsScreen,
    LogoutRoute: LogoutScreen,
    HelpAndSupportRoute: HelpAndSupportScreen,
    Choice: Choice
  },
  {
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

/* TOP NAVIGATOR */
/* Drawer: common drawer for both buyer and seller
SplashScreen: First screen that comes up
ChoiceRoute: whether buyer or seller
CompanyDetails: when signup 
LoginRoute and SignUpRoute: adds users to db
*/
const AppNavigator = createSwitchNavigator(
  {
    Drawer: Drawer,
    LoginRoute: LoginScreenBuyer,
    SignUpRoute: SignUpScreenBuyer,
    CompanyDetailsRoute: CompanyDetails,
    ChoiceRoute: Choice,
    SplashScreen: SplashScreen,
  },
  {
    initialRouteName: "SplashScreen",
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default () =>
  <Root>
    <AppContainer />
  </Root>;