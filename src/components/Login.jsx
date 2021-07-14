import {auth} from "../firebaseProvider";
import React from "react";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setError, setLoadingStatus, setLoggedInUser} from "../redux/actions";
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
import {useFormik} from "formik";
import * as Yup from 'yup'


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

export default function Login() {
    const classes = useStyles();
    const history = useHistory()
    let dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().required().email(),
            password: Yup.string().required().min(6)
        }),
        onSubmit: async ({email, password}) => {
            console.log(email, password)
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
                history.push('/')
            } catch (e) {
                dispatch(setError(e))
            }

        }
    })

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
                        autoFocus
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

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={!formik.isValid || formik.isSubmitting}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href={ "/signup" } variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>

        </Container>
    );
}