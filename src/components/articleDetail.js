import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Animated, Easing } from 'react-native'
import { WebView } from 'react-native-webview'
export default class extends Component {
  // static navigationOptions = {
  //   title: '文章详情页'
  // }
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`
  })

  constructor(props) {
    super(props)
    this.state = {
      progressValue: new Animated.Value(0),
      loading: true
    }
  }

  componentDidMount () {
    Animated.timing(this.state.progressValue, {
      toValue: width - 10,
      duration: 1500,
      easing: Easing.linear
    }).start();
  }
  componentWillReceiveProps () {
    Animated.timing(this.state.progressValue, {
      toValue: width - 10,
      duration: 1500,
      easing: Easing.linear
    }).start();
  }

  onLoadEnd = () => {
    setTimeout(()=>{
      this.setState({
        progressValue: width - 20,
        loading: false
      })
    }, 1000)
  }
  render() {
    const { navigation } = this.props
    const url = navigation.getParam('url')
    // console.log(navigation.state)
    return <View style={styles.wrap}>
      {
        this.state.loading ? <Animated.View style={{ height: 2, backgroundColor: '#457', width: this.state.progressValue }}>
        </Animated.View> : null
      }
      <WebView source={{ uri: url }}
        onLoadStart={this.onLoadStart}
        onLoadEnd={this.onLoadEnd}
      ></WebView>
    </View>
  }
}
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    margin: 5,
    paddingTop: 5,
    paddingBottom: 10,
    backgroundColor: '#f6f6f6',
    width: Dimensions.get('window').width - 10
  }
})