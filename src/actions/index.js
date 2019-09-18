import * as types from '../constants/index'
export const addArticles = (articleList, targetIndex) => ({
  type: types.ADD_ARTICLE,
  articleList,
  targetIndex
})
export const refreshArticle = (articleList, targetIndex) => ({
  type: types.REFRESH_ARTICLE,
  articleList,
  targetIndex
})