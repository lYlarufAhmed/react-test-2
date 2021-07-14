import {Link, useHistory} from "react-router-dom";
import React from "react";
import {auth} from "../firebaseProvider";
import {useDispatch} from "react-redux";
import {setError, setLoggedInUser} from "../redux/actions";
import {useAuthState} from "react-firebase-hooks/auth";

import styled from "styled-components"
import {FlexContainer, Button} from "./Styled";

const NavWrapper = styled(FlexContainer)`
  background-color: black;
  color: white;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.5rem;
`

export default function Navbar(props) {
    const [user] = useAuthState(auth)
    let dispatch = useDispatch()
    const history = useHistory()
    const signOut = async () => {
        try {
            await auth.signOut()
            dispatch(setLoggedInUser(null))
            return history.push('/login')
        } catch (e) {
            dispatch(setError(e))
        }
    }
    if (!user) history.push('/login')
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
        <NavWrapper>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li><Link to={'/category/mobiles'}>Mobiles</Link></li>
            <li><Link to={'/category/laptops'}>Laptops</Link></li>
            <li><Link to={'/category/appliances'}>Appliances</Link></li>
            <li>
                <Button primary onClick={() => signOut()}>Sign out</Button>
            </li>
        </NavWrapper>

    )

}