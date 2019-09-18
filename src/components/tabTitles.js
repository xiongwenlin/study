import React, { Component } from 'react'
import { View, Text, Animated, StyleSheet, TouchableOpacity } from 'react-native'
export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      transAnimX: new Animated.Value(0)
    }
  };

  render() {
    const { titles, textColor, backgroundColor, activeColor, handleClick, activeIndex } = this.props
    return (
      <View style={[styles.wrap, { backgroundColor }]}>
        {
          titles.map((title, index) => {
            return <TouchableOpacity onPress={() => handleClick(index)} style={styles.item} key={index} underlayColor={'#f8f8f8'}>
              <Text style={{
                color: index === activeIndex ? activeColor : textColor,
                fontSize: 16
              }}>{title}</Text>
            </TouchableOpacity>
          })
        }
      </View>
    )
  }
}
const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    height: 40
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    height: 40,
    alignItems: 'center'
  }
})