import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
export default class extends Component {
  static navigationOptions = {
    drawerLabel: 'beauty',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../../images/icon_beautiful.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
  };
  render () {
    return <View><Text>福利专区</Text></View>
  }
};
const styles = StyleSheet.create({
  icon: {
    width: 22,
    height: 22
  }
});