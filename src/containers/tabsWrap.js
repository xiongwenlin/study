import { connect } from 'react-redux'
import React, { Component } from 'react'
import ArticleList from '../components/articleList'
import { InteractionManager } from 'react-native'
import { addArticles, refreshArticle } from '../actions'
import Tabs from '../components/scrollTabs'
import Tab from '../components/tab'
class homeTabs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      didMout: false
    }
  }
  render() {
    const { didMout } = this.state
    const { articles, addArticles, refreshArticle, navigation, activeIndex } = this.props
    return didMout ? (<Tabs backgroundColor={'rgb(39,181,238)'} textColor={'#f8f8f8'} activeColor={'#9ccc3e'}>
      <Tab title="安卓">
        <ArticleList index={0} navigation={navigation} title="安卓" data={articles[0].list} pageNo={articles[0].pageNo} hasMore={articles[0].hasMore} addArticles={addArticles} refreshArticle={refreshArticle} type={'Android'}>
        </ArticleList>
      </Tab>
      <Tab title="苹果">
        <ArticleList  navigation={navigation} title="苹果" data={articles[1].list} pageNo={articles[1].pageNo} hasMore={articles[1].hasMore} addArticles={addArticles} refreshArticle={refreshArticle} type={'iOS'}>
        </ArticleList>
      </Tab>
      <Tab title="拓展">
        <ArticleList  navigation={navigation} title="拓展" data={articles[2].list} pageNo={articles[2].pageNo} hasMore={articles[2].hasMore} addArticles={addArticles} refreshArticle={refreshArticle} type={'拓展资源'}>
        </ArticleList>
      </Tab>
    </Tabs>) : null
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        didMout: true
      })
    });
  }
}
const mapStateToProps = state => ({
  articles: state.articles
})
const mapDispatchToProps = dispatch => ({
  addArticles: (articleList, targetIndex) => dispatch(addArticles(articleList, targetIndex)),
  refreshArticle: (articleList, targetIndex) => dispatch(refreshArticle(articleList, targetIndex))
})
export default connect(mapStateToProps, mapDispatchToProps)(homeTabs)