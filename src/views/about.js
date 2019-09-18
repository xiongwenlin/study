import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
export default class extends Component {
  static navigationOptions = {
    drawerLabel: 'about',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../../images/icon_about.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
  };
  render () {
    return <View><Text>关于</Text></View>
  }
}
const styles = StyleSheet.create({
  icon: {
    width: 22,
    height: 22
  }
})