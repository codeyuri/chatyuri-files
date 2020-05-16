import * as types from './types';

export const addUser = user => {
    return {
        type: types.ADD_USER,
        user
    }
}