import * as types from '../actions/types';

const chatReducer = (state = [], action) => {
    switch(action.type) {
        case types.ADD_USER:
            return ([
                ...state,
                {
                    ...state,
                    id: Math.random(),
                    user: action.user
                }
            ])
        default: return state;
    }
}

export default chatReducer;