import React, { Component } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import HomeTabs from '../containers/tabsWrap'
import Header from '../components/header'
export default class extends Component {
  static navigationOptions = {
    drawerLabel: 'home',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../../images/icon_home.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
  };
  
  open = () => this.props.navigation.openDrawer();
  render() {
    const { navigation } = this.props
    return <View style={styles.wrap}>
      <Header handle={this.open} title={'干货分享'} icon={require('../../images/ic_menu.png')} isHome={true}></Header>
      <HomeTabs navigation={navigation} />
    </View>
  };
}
const styles = StyleSheet.create({
  wrap:{
    flex: 1
  },
  icon: {
    width: 22,
    height: 22
  }
});