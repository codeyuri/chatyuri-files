import { combineReducers } from 'redux';
import chatReducer from './reducers/chatReducer';

const rootReducer = combineReducers({
    chat: chatReducer
})

export default rootReducer;