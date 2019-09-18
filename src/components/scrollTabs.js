import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native'
import TabTitle from './tabTitles'
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curIndex: 0,
      enable: true
    }
    this.width = Dimensions.get('window').width
    this.tabNums = this.props.children.length
  }
  handleClick = (index) => {
    const { curIndex } = this.state
    if (index < 0 || index >= this.tabNums) {
      return;
    }
    this.tabs.scrollTo({ x: this.width * index, y: 0, animated: true })
    if (curIndex !== index) {
      this.setState({
        curIndex: index
      })
    }
  }
  handleStart = (e) => {
    this.startTime = e.nativeEvent.timestamp
    this.startY = e.nativeEvent.pageY
    this.startX = e.nativeEvent.pageX
  }
  handleMove = (e) => {
    let endX = e.nativeEvent.pageX
    let endY = e.nativeEvent.pageY
    let durationX = endX - this.startX
    let durationY = endY - this.startY
    Math.abs(durationY) < Math.abs(durationX) && this.tabs.scrollTo({ x: this.width * this.state.curIndex - durationX, y: 0, animated: false })
  }
  handleEnd = (e) => {
    let endTime = e.nativeEvent.timestamp
    let endX = e.nativeEvent.pageX
    const { curIndex } = this.state
    let duration = endX - this.startX
    if (duration > 0) {
      nextIndex = curIndex - 1
    } else {
      nextIndex = curIndex + 1
    }
    duration = Math.abs(duration)

    // 快速滑动
    if (endTime - this.startTime < 200) {
      // 点击
      if (duration > 10) {
        this.handleClick(nextIndex)
        return;
      }

    }

    if (duration > this.width / 3) {
      this.handleClick(nextIndex)
    } else {
      this.handleClick(this.state.curIndex)
    }
  }
  render() {
    const { curIndex } = this.state
    // console.log(curIndex)
    let titles = this.props.children.map(element => element.props.title)
    return (
      <View style={styles.tabs}>
        <TabTitle titles={titles} activeIndex={curIndex} {...this.props} handleClick={this.handleClick}></TabTitle>
        <ScrollView style={styles.tabs} horizontal={true}
          ref={tabs => this.tabs = tabs}
          activeIndex={curIndex}
          onMovetShouldSetResponderCapture={(e) => { console.log(e); return true; }}
          // onMoveShouldSetResponderCapture = {e => {console.log('move',e); return true}}
          // onTouchMove={e => {console.log('moving', e)}}
          onTouchMove={this.handleMove}
          onTouchEnd={this.handleEnd}
          onTouchStart={this.handleStart}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
        >{this.props.children}</ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  tabs: {
    flex: 1
  }
})