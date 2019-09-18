import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import { Easing, Animated } from 'react-native'

import DrawNav from './draw.js'
import ArticleDetail from '../components/articleDetail'
const App = createStackNavigator({
  Main: {
    screen: DrawNav,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  ArticleDetail: {
    screen: ArticleDetail
  }
},
  {
    initialRouteName: 'Main',
    headerMode: 'screen',
    mode: 'card',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });
        return { opacity, transform: [{ translateY }] };
      },
    }),
  })

export default createAppContainer(App)