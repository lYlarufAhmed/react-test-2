import {
    ADD_ITEMS,
    DELETE_ITEM,
    SET_ERROR,
    SET_ITEMS,
    SET_LOADING_STATUS,
    SET_LOGGED_IN_USER
} from "../actions/action_types";

const initialState = {
    'loading': true,
    'error': '',
    'loggedInUser': null,
    'items': {
        'mobiles': [],
        'laptops': [],
        'appliances': []
    }
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
        case SET_ITEMS:
            state.items[action.data.category] = action.data.items
            break
        case DELETE_ITEM:
            let updatedItems = state.items[action.data.category].filter((item) => item.id !== action.data.id)
            state.items[action.data.category] = updatedItems
            break

        case ADD_ITEMS:
            state.items[action.data.category].push(action.data.product)
            break
        default:
            return state
        // throw Error('Wrong Action')
    }
    return JSON.parse(JSON.stringify(state))
}