import {ADD_ITEMS, DELETE_ITEM, SET_ERROR, SET_ITEMS, SET_LOADING_STATUS, SET_LOGGED_IN_USER} from "./action_types";
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

export const setItems = (category, items) => ({
    type: SET_ITEMS,
    data: {category, items}
})

export const deleteItem = (id, category) => ({
    type: DELETE_ITEM,
    data: {category, id}
})

export const addItem = (product, category) => ({
    type: ADD_ITEMS,
    data: {product, category}
})


export function storeNewUserDataMiddleware(userData) {
    return async function (dispatch) {
        dispatch(setLoadingStatus(true))
        try {
            await firestore.collection('users').doc(userData.id)
                .set(userData.info)
        } catch (e) {
            dispatch(setError(e.message))
        }
        dispatch(setLoadingStatus(false))
    }
}

export function getItems(category) {
    return async function (dispatch) {
        dispatch(setLoadingStatus(true))
        try {
            let items = []
            let snapShot = await firestore.collection('items')
                .where('categoryName', '==', category).get()
            if (!snapShot.empty) {
                snapShot.forEach(doc => {
                    console.log(doc.data(), doc.id)
                    items.push({...doc.data(), id: doc.id})
                })
            }
            dispatch(setItems(category, items))
        } catch (e) {
            setError(e.message)
        }
        dispatch(setLoadingStatus(false))
    }

}

export function deleteItemMiddleWare(id, category) {
    return async function (dispatch) {
        dispatch(setLoadingStatus(true))
        try {
            const res = await firestore.collection('items').doc(id).delete()
            console.log(res)
            dispatch(deleteItem(id, category))
        } catch (e) {
            console.log(e)
            dispatch(setError(e.message))
        }
        dispatch(setLoadingStatus(false))
    }
}

export function addProduct(product) {
    return async function (dispatch) {
        dispatch(setLoadingStatus(true))
        try {
            const newProduct = await firestore.collection('items').add({...product})
            product.id = newProduct.id
            dispatch(addItem(product, product.categoryName))
        } catch (e) {
            dispatch(setError(e.message))
        }
        dispatch(setLoadingStatus(false))

    }
}