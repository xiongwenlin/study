
import { createDrawerNavigator } from 'react-navigation-drawer'
import { StyleSheet } from 'react-native'
import { createAppContainer } from 'react-navigation'

import React from 'react'
import { NavigationUtils } from '../constants'
import about from '../views/about'
import beauty from '../views/beauty'
import home from '../views/home'
const styles = StyleSheet.create({
  item:{
    marginTop: 5
  }
})
const Drawer = createDrawerNavigator({
  home: {
    screen: home,
    navigationOptions: {
      drawerLabel: 'home'
    },
  },
  beauty: {
    screen: beauty,
    navigationOptions: {
      drawerLabel: 'beauty'
    },
  },
  about: {
    screen: about,
    navigationOptions: {
      drawerLabel: 'about'
    },
  }
}, {
  order: ['home', 'beauty', 'about'],
  drawerWidth: 250, //抽屉的宽度或返回的功能。
  drawerPosition: 'left', //选项是left或right。默认是left位置。
  useNativeAnimations: true, //启用原生动画。默认是true。
  drawerBackgroundColor: '#f6f6f6',
  contentOptions: {
    // items: [OtherScreen],//可以修改或覆盖路由数组  不知道干嘛用的
    // activeItemKey: 'AppInfo', //识别活动路线的关键  也不知道干嘛用的

    activeTintColor: '#fff', //活动标签的标签和图标颜色
    activeBackgroundColor: 'rgb(39,181,238)', //活动标签的背景颜色
    // inactiveTintColor: '#333', //非活动标签的标签和图标颜色
    // inactiveBackgroundColor: '#fff', //非活动标签的背景颜色

    // //按下项目时要调用的函数 不知道是否使用错误 一直没反应
    //github上面有答案 在自定义视图的时候 会有用
    onItemPress(route) {
        console.log('onItemPress'+route);
    },


    // itemsContainerStyle: "", //内容部分的样式对象
    itemStyle: styles.item, //单个项目的样式对象，可以包含图标和 / 或标签
    // labelStyle: '', //Text当标签是字符串时，样式对象在内容部分内覆盖样式
    // activeLabelStyle: '', //Text当标签是字符串（与之合并labelStyle）时，样式对象覆盖活动标签的样式
    // inactiveLabelStyle: '', //Text当标签是字符串（与之合并labelStyle）时，样式对象覆盖非活动标签的样式
    // iconContainerStyle: '', //样式对象以覆盖View图标容器样式。
  }
})
export default function (props) {
  NavigationUtils.navigation = props.navigation
  const Tab = createAppContainer(Drawer)
  return <Tab />
}

