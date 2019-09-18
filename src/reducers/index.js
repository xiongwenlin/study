import {combineReducers} from 'redux';
import articles from './artiles';
import beautyReducers from  './beauty';

const rootReducer = combineReducers({
	articles,
	beautyReducers
})

export default rootReducer;
