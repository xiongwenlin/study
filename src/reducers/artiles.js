import * as types from '../constants'
import { cloneDep } from '../utils'
let index = 1
const initialState = [
    {
        pageNo: 1,
        list: [],
        hasMore: true
    },
    {
        pageNo: 1,
        list: [],
        hasMore: true
    },
    {
        pageNo: 1,
        list: [],
        hasMore: true
    }
]
export default modArticle = function (state = initialState, action) {
    let newState = cloneDep(state)
    let targetIndex = action.targetIndex
    switch (action.type) {
        case types.ADD_ARTICLE:
            newState[targetIndex].pageNo++
            newState[targetIndex].list.push(...action.articleList.map(i => { i.id = index++ ; return i}))
            return newState
        case types.REFRESH_ARTICLE:
            newState[targetIndex].pageNo = 1
            newState[targetIndex].list = action.articleList.map(i => { i.id = index++ ; return i})         
            return newState
        default:
            return state
    }
}