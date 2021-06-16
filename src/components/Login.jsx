import {auth} from "../firebaseProvider";
import React, {useRef} from "react";
import {Link, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setError, setLoggedInUser, storeNewUserDataMiddleware} from "../redux/actions";
// import {useAuthState} from "react-firebase-hooks/auth";
import Navbar from "./Navbar";
import {useAuthState} from "react-firebase-hooks/auth";

export default function Login(props) {

    const [user] = useAuthState(auth)
    // const user = useSelector(state => state.app.loggedInUser)
    let dispatch = useDispatch()
    const signInWithEmail = async () => {
        try {
            let loggedUser = await auth.signInWithEmailAndPassword(emailRef.current.value, passRef.current.value);
            console.log(loggedUser)
            dispatch(setLoggedInUser({
                id: loggedUser.user.uid,
                refreshToken: loggedUser.user.refreshToken,
                email: loggedUser.user.email,
                username: loggedUser.user.displayName,
                photoURL: loggedUser.user.displayName,
                lastLoggedIn: loggedUser.user.metadata.lastSignInTime,
                creationTime: loggedUser.user.metadata.creationTime,
            }))
        } catch (e) {
            console.log(e)
            dispatch(setError(e))
        }
    }

    let emailRef = useRef()
    let passRef = useRef()
    if (user) return <Redirect to={'/'}/>
    return (
        <>
            <Navbar/>
            <input type={'email'} ref={emailRef}/>
            <input type={'password'} ref={passRef}/>
            <button className="sign-in" onClick={() => signInWithEmail()}>Login</button>
            <Link to={'/signup'}>Sign up</Link>
        </>
    )

}
