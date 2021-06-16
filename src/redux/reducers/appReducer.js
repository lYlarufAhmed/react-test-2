import {SET_ERROR, SET_LOADING_STATUS, SET_LOGGED_IN_USER} from "../actions/action_types";

const initialState = {
    'loading': true,
    'error': '',
    'loggedInUser': null
}
export default function appReducer(state = initialState, action) {
    switch (action.type) {

        case SET_LOADING_STATUS:
            state.loading = action.data
            break
        case SET_ERROR:
            state.error = action.data
            break
        case SET_LOGGED_IN_USER:
            state.loggedInUser = action.data
            break
        default:
            return state
            // throw Error('Wrong Action')
    }
    return JSON.parse(JSON.stringify(state))
}