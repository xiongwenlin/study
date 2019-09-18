import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
export default function (props) {
  const { handle, title, icon, isHome, handleRefresh } = props
  return (
    <View style={[styles.base, isHome ? styles.two : styles.there]}>
      <TouchableOpacity onPress={handle}>
        <Image source={icon} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.text}>{title}</Text>
      {isHome ? null : <TouchableOpacity onPress={handleRefresh}>
        <Image source={require('../../images/ic_refresh.png')} style={styles.icon}/>
      </TouchableOpacity>
      }
    </View>
  )
}
const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    fontSize: 14,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: 'rgb(39,181,238)'
  },
  text: {
    color: '#fff',
    marginLeft: 10
  },
  icon: {
    width: 30,
    height: 30
  },
  two: {
    justifyContent: 'flex-start'
  },
  there: {
    justifyContent: 'space-evenly'
  }
}) 