import {Link} from "react-router-dom";
import React from "react";
import {auth} from "../firebaseProvider";
import {useDispatch} from "react-redux";
import Redirect from "react-router-dom/es/Redirect";
import {setError, setLoggedInUser} from "../redux/actions";
import {useAuthState} from "react-firebase-hooks/auth";

export default function Navbar(props) {
    const [user] = useAuthState(auth)
    let dispatch = useDispatch()
    const signOut = async () => {
        try {
            await auth.signOut()
            dispatch(setLoggedInUser(null))
            return <Redirect to={'/login'}/>
        } catch (e) {
            dispatch(setError(e))
        }
    }
    if (!user) return <Redirect to={'/login'}/>
    else dispatch(setLoggedInUser({
        id: user.uid,
        refreshToken: user.refreshToken,
        email: user.email,
        username: user.displayName,
        photoURL: user.displayName,
        lastLoggedIn: user.metadata.lastSignInTime,
        creationTime: user.metadata.creationTime,
    }))
    return (
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {user ? <>
                    <li>

                        <button onClick={() => signOut()}>Sign out</button>
                    </li>
                </> : <>
                    <li>
                        <Link to="/login">Log in</Link>
                    </li>
                    <li>
                        <Link to="/signup">Sign Up</Link>
                    </li>
                </>}
            </ul>
            <hr/>
        </div>
    )

}