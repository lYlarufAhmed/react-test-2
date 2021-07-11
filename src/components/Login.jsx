import {auth} from "../firebaseProvider";
import React, {useRef, useState} from "react";
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setError, setLoadingStatus, setLoggedInUser} from "../redux/actions";
import {useAuthState} from "react-firebase-hooks/auth";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Link from "@material-ui/core/Link";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function SignIn({signIn}) {
    const classes = useStyles();
    let [email, setEmail] = useState()
    let [password, setPassword] = useState()

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onInput={e => {
                            setEmail(e.target.value)
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onInput={e => {
                            setPassword(e.target.value)
                        }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={!(email && password)}
                        onClick={(e) => {
                            e.preventDefault()
                            signIn(email, password)
                        }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>

        </Container>
    );
}

export default function Login(props) {

    const [user] = useAuthState(auth)
    const loading = useSelector(state => state.app.loading)
    const loggedInUser = useSelector(state => state.app.loggedInUser)
    let dispatch = useDispatch()
    const signInWithEmail = async (email, password) => {
        console.log(email, password)
        if (email && password) {

            dispatch(setLoadingStatus(true))
            try {
                let loggedUser = await auth.signInWithEmailAndPassword(email, password);
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
    }


    if (user) {
        dispatch(setLoadingStatus(false))
        return <Redirect to={'/'}/>
    }
    return (
        <>
            {!loggedInUser ? <>
                {/*<input type={'email'} ref={emailRef}/>*/}
                {/*<input type={'password'} ref={passRef}/>*/}
                {/*<button className="sign-in" onClick={() => signInWithEmail()}>Login</button>*/}
                {/*<Link to={'/signup'}>Sign up</Link>*/}
                <SignIn signIn={signInWithEmail}/>
            </> : loading && 'Loading......'}

        </>
    )

}
