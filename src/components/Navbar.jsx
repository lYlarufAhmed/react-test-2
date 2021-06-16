import {Link} from "react-router-dom";
import React from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebaseProvider";
import {useDispatch} from "react-redux";
import Redirect from "react-router-dom/es/Redirect";
import {setError} from "../redux/actions";

export default function Navbar(props) {
    const [user] = useAuthState(auth)
    let dispatch = useDispatch()
    const signOut = async () => {
        try {
            await auth.signOut()
            return <Redirect to={'/login'}/>
            // remove the loggedin user from redux
        } catch (e) {
            dispatch(setError(e))
        }
    }
    return (
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {user ? <>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>

                        <button onClick={() => signOut()}>Sign out</button>
                    </li>
                </> : <>
                    <li>
                        <Link to="/login">Log in</Link>
                    </li>
                    <li>
                        <Link to="/signin">Sign in</Link>
                    </li>
                </>}
            </ul>
            <hr/>
        </div>
    )

}