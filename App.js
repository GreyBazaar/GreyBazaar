import React from "react";
import Setup from "./src/boot/setup";
import {decode, encode} from 'base-64'
import firebase from 'firebase'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

export default class App extends React.Component {
  componentDidMount()
  {

    var firebaseConfig = {
      apiKey: "AIzaSyD86qcj_Y7TebCE0ItFx3rbWk7Jt6hpOnk",
      authDomain: "greybazaar-99830.firebaseapp.com",
      databaseURL: "https://greybazaar-99830.firebaseio.com",
      projectId: "greybazaar-99830",
      storageBucket: "greybazaar-99830.appspot.com",
      messagingSenderId: "633758325063",
      appId: "1:633758325063:web:2c65acfd12dc333a04d462",
      measurementId: "G-LG0H64QJ41"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
  }
  render() {
    return <Setup />;
  }
}