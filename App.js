import React from "react";
import Setup from "./src/boot/setup";
import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

export default class App extends React.Component {
  render() {
    return <Setup />;
  }
}