import React, { Component } from 'react'
import { FlatList, Text, View, StyleSheet, TouchableOpacity, PanResponder } from 'react-native'
import { getArticle } from '../http'
import { formateTime } from '../utils/index'
import { NavigationUtils } from '../constants'
const Empty = function () {
  return <View style={styles.empty}><Text>暂无内容</Text></View>
}
const panResponder = PanResponder.create({
  // 拦截move事件
  // onStartShouldSetPanResponder: () => {
  //   console.log('捕获')
  //   return true
  // },
  // onMoveShouldSetPanResponderCapture: () => {
  //   console.log('ss')
  //   return true
  // },
  // onStartShouldSetPanResponderCapture: () => {
  //   console.log('bu')
  //   return true
  // },
  // onMoveShouldSetPanResponder: (evt, gestureState) => {
  //   console.log(gestureState)
  //     return Math.abs(gestureState.dy) > 10;
  // },
  onStartShouldSetPanResponder: (evt, gestureState) => true,
  onMoveShouldSetPanResponder: (evt, gestureState) => {
    return Math.abs(gestureState.dx) > 10
  },
})
const Element = function (props) {
  const { handleToDetail, url, desc } = props
  return <View style={styles.item} {...panResponder.panHandlers}>
    <TouchableOpacity underlayColor={'#ccc'} onPress={() => handleToDetail(url, desc)}>
      <View><Text style={styles.itemTitle} numberOfLines={1}>{props.desc}</Text></View>
      <View style={styles.itemBottom}>
        <Text>作者 {props.who}</Text>
        <Text>{formateTime(new Date(props.publishedAt))}</Text>
      </View>

    </TouchableOpacity>


  </View>
}

const Line = function () {
  return <View style={styles.line}></View>
}
const Loading = function () {
  return <View style={styles.empty}><Text>加载中...</Text></View>
}
export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      refresh: false
    }
  }
  handleToDetail = (url, title) => {
    const { navigation } = NavigationUtils
    console.log(url)
    navigation.push('ArticleDetail', {
      url: url,
      title
    })
  }
  getInfo = (callBack, key = 'loading') => {
    const { hasMore, pageNo, type } = this.props
    let index = {
      'Android': 0,
      'iOS': 1,
      '拓展资源': 2
    }[type]
    if (hasMore) {
      getArticle(type, key === 'refresh' ? undefined : pageNo).then(res => {
        callBack(res.results, index)
        this.setState(JSON.parse(`{
          "${key}": false
        }`))
      })
    }
  }

  componentDidMount() {
    const { addArticles, index, data } = this.props
    if (index === 0 && data.length === 0) {
      this.getInfo(addArticles)

    }
  }
  componentWillReceiveProps(props) {
    console.log('gengxin')
  }
  handleEndReach = () => {
    const { data, addArticles } = this.props
    // console.log(data)
    if (data.length < 9) {
      return
    }
    this.setState({
      loading: true
    })
    this.getInfo(addArticles)

  }
  handleRefresh = () => {
    const { refreshArticle } = this.props

    // console.log('top')
    this.setState({
      refresh: true
    })
    this.getInfo(refreshArticle, 'refresh')
  }
  handleStart = (e) => {
    this.height || (this.height = 0)
    this.startTime = e.nativeEvent.timestamp
    this.startY = e.nativeEvent.pageY
    this.startX = e.nativeEvent.pageX
  }
  handleMove = (e) => {
    let endY = e.nativeEvent.pageY
    let endX = e.nativeEvent.pageX
    let durationY = endY - this.startY
    let durationX = endX - this.startX
    this.startX = endX
    this.startY = endY
    this.height -= durationY
    this.height = Math.max(this.height, -20)
    Math.abs(durationX) < Math.abs(durationY) && this.list.scrollToOffset({ offset: this.height, animated: true })
  }
  // handleEnd = (e) => {
  //   let endTime = e.nativeEvent.timestamp
  //   let endX = e.nativeEvent.pageX
  //   const { curIndex } = this.state
  //   let duration = endX - this.startX
  //   if (duration > 0) {
  //     nextIndex = curIndex - 1
  //   } else {
  //     nextIndex = curIndex + 1
  //   }
  //   duration = Math.abs(duration)

  //   // 快速滑动
  //   if (endTime - this.startTime < 200) {
  //     // 点击
  //     if (duration > 10) {
  //       this.handleClick(nextIndex)
  //       return;
  //     }
  //   }
  // }

  render() {
    const { data } = this.props
    const { loading, refresh } = this.state
    return (
      <FlatList data={data}
        ref={list => this.list = list}
        ListFooterComponent={loading ? Loading : null}
        refreshing={refresh}
        style={styles.wrap}
        onEndReachedThreshold={.1}
        onEndReached={this.handleEndReach}
        onRefresh={this.handleRefresh}
        getItemLayout={(data, index) => ({ length: 51, offset: 51 * data.length, index })}
        keyExtractor={(item) => item.id + ''}
        ListEmptyComponent={Empty}
        ItemSeparatorComponent={Line}
        initialNumToRender={10}
        onTouchMove={this.handleMove}
        // onTouchEnd={this.handleEnd}
        onTouchStart={this.handleStart}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        renderItem={({ item }) => <Element handleToDetail={this.handleToDetail} {...item} />}>
      </FlatList>
    )
  }
}
const styles = StyleSheet.create({
  empty: {
    flex: 1,
    fontSize: 16,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  line: {
    height: 1,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  wrap: {
    flex: 1
  },
  item: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    color: 'black',
    // height: 50,
    fontSize: 14
  },
  itemTitle: {
    // height: 30
    marginBottom: 10,
    fontWeight: "700"
  },
  itemBottom: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between'
  },
  hiddenTxt: {
  }
})