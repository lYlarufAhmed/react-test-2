import {Link, useHistory} from "react-router-dom";
import React from "react";
import {auth} from "../firebaseProvider";
import {useDispatch} from "react-redux";
import {setError, setLoggedInUser} from "../redux/actions";
import {useAuthState} from "react-firebase-hooks/auth";

import styled, {css} from "styled-components"
import {FlexContainer, Button} from "./Styled";

const NavWrapper = styled(FlexContainer)`
  background-color: black;
  color: white;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.5rem;
`

const NavItem = styled.li`
  list-style: none;
  padding: .3rem .5rem;

  :hover {
    background-color: wheat;
    color: black;
    font-weight: bolder;
  }

  ${props => props.active && css`
    background-color: wheat;
    color: black;
    font-weight: bolder;
  `}

`

export default function Navbar(props) {
    const [user] = useAuthState(auth)
    let dispatch = useDispatch()
    let [currentlyActive, setCurrentlyActive] = React.useState(-1)
    const history = useHistory()
    const routes = ['Home', 'Mobiles', 'Laptops', 'appliances']
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
    const handleClick = (e) => {
        setCurrentlyActive(parseInt(e.target.id))
    }
    return (
        <NavWrapper>
            {routes.map((route, index) => (
                <NavItem active={index === currentlyActive} key={index} id={`nav-item-${index}`}
                         ><Link onClick={handleClick} id={index}
                    to={route === 'Home' ? '/' : `/category/${route.toLowerCase()}`}>{route}</Link></NavItem>))}
            <li>
                <Button primary onClick={() => signOut()}>Sign out</Button>
            </li>
        </NavWrapper>

    )

}