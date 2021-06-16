import {SET_ERROR, SET_LOADING_STATUS, SET_LOGGED_IN_USER} from "./action_types";
import {firestore} from "../../firebaseProvider";


export const setLoadingStatus = (status) => ({
    type: SET_LOADING_STATUS,
    data: status
})

export const setError = (err) => ({
    type: SET_ERROR,
    data: err
})


export const setLoggedInUser = (userData) => ({
    type: SET_LOGGED_IN_USER,
    data: userData
})


export function storeNewUserDataMiddleware(userData) {
    return async function (dispatch) {
        dispatch(setLoadingStatus(true))
        try {
            await firestore.collection('users').doc(userData.id)
                .set(userData.info)
        } catch (e) {
            dispatch(setError(e))
        }
        dispatch(setLoadingStatus(false))
    }
}
