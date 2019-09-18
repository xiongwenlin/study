import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
export default function (props) {
  return <View style={styles.wrap}>{props.children}</View>
}
const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    margin: 5,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#f6f6f6',
    width: Dimensions.get('window').width - 10
  }
})