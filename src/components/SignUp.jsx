import {auth} from "../firebaseProvider";
import {useDispatch} from "react-redux";
import {setError, storeNewUserDataMiddleware} from "../redux/actions";
import React, {useRef} from "react";
import {useHistory} from "react-router-dom";
import Navbar from "./Navbar";

export default function SignUp(props) {
    let history = useHistory()
    let dispatch = useDispatch()
    let emailRef = useRef()
    let passRef = useRef()
    const signUpWithPassword = async (email, password) => {
        try {
            let loggedUser = await auth.createUserWithEmailAndPassword(email, password)
            let data = {
                id: loggedUser.user.uid,
                info: {
                    refreshToken: loggedUser.user.refreshToken,
                    email: loggedUser.user.email,
                    username: loggedUser.user.displayName,
                    photoURL: loggedUser.user.displayName,
                    creationTime: loggedUser.user.metadata.creationTime,
                }
            }
            dispatch(storeNewUserDataMiddleware(data))

            console.log(loggedUser, 'is logged registered')
            return history.push('/login')
        } catch (e) {
            dispatch(setError(e))
        }
    }
    return (
        <>
            <Navbar/>
            <input type={'email'} ref={emailRef}/>
            <input type={'password'} ref={passRef}/>
            <button onClick={() => signUpWithPassword(emailRef.current.value, passRef.current.value)}>Sign Up</button>
        </>
    )
}