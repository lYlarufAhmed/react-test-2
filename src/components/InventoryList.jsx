import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebaseProvider";
// import {useDispatch, useSelector} from "react-redux";
import React from "react";
import Redirect from "react-router-dom/es/Redirect";

export default function InventoryList(props) {

    const [user] = useAuthState(auth)
    // let loading = useSelector(state => state.app.loading)
    // let dispatch = useDispatch()
    // useEffect(() => {
    //     if (!tripObjs.length && user)
    //         dispatch(fetchTripListMiddleWare())
    // },[dispatch, tripObjs.length, user])
    if (!user) return <Redirect to={'/login'}/>
    return (
        <h1>Inventory list</h1>
    )
}