import {auth} from "../firebaseProvider";
import {useDispatch} from "react-redux";
import {setError, setLoadingStatus, setLoggedInUser, storeNewUserDataMiddleware} from "../redux/actions";
import React, {useRef} from "react";
import {useHistory} from "react-router-dom";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

import {useFormik} from "formik";
import * as Yup from 'yup'
import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
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
export default function SignUp(props) {
    let history = useHistory()
    let classes = useStyles()
    let dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required().email(),
            password: Yup.string().required().min(6),
            confirmPassword: Yup.string().required('confirm password is required').oneOf([Yup.ref('password')], 'password does not match')
            // confirmPassword: Yup.string().required('confirm password is required').matches(Yup.ref('password'))
        }),
        onSubmit: values => signUpWithPassword(values.email, values.password),

    })
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
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        error={!!formik.errors.email}
                        helperText={formik.errors.email}
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
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        error={!!formik.errors.password}
                        helperText={formik.errors.password}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}
                        error={!!formik.errors.confirmPassword}
                        helperText={formik.errors.confirmPassword}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={!formik.isValid}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href={"/login"} variant="body2">
                                {"Already registered? Login"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>

        </Container>
    )
}