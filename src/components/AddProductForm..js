import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useFormik} from "formik";
import {FormControl, InputLabel, MenuItem, Select, Snackbar} from "@material-ui/core";
import * as Yup from 'yup'
import {addProduct} from "../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {Add} from "@material-ui/icons";
import {Alert} from "./Login";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    formControl: {
        margin: theme.spacing(2),
        minWidth: 120,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        // marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function AddProductForm() {
    const classes = useStyles();
    let dispatch = useDispatch()
    let error = useSelector(state => state.app.error)
    let [success, setSuccess] = React.useState(false)
    const formik = useFormik({
        initialValues: {
            quantity: 1,
            name: '',
            categoryName: '',
            price: 0,
            image: '',
            description: '',
        },
        validationSchema: Yup.object({
            price: Yup.number().required().positive(),
            quantity: Yup.number().required().positive().integer(),
            name: Yup.string().required().max(30, 'Must be 30 or less characters.'),
            categoryName: Yup.string().required(),
            image: Yup.string().url('Not a valid url!'),
            description: Yup.string().max(200)
        }),
        onSubmit: async (values, {resetForm}) => {
            dispatch(addProduct(values))
            setSuccess(true)
            setTimeout(()=>setSuccess(false), 2000)
            resetForm()
        }
    })
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Snackbar open={error || success} autoHideDuration={3000}>
                <Alert severity={error ? 'error': 'success'}>
                    {error || 'Success!'}
                </Alert>
            </Snackbar>
            <div className={classes.paper}>

                <Typography component="h1" variant="h5">
                    New Product
                </Typography>
                <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        error={!!formik.errors.name}
                        required
                        id="name"
                        label="Name"
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        helperText={formik.errors.name}
                        fullWidth
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        error={!!formik.errors.quantity}
                        helperText={formik.errors.quantity}
                        id="quantity"
                        label="Quantity"
                        name="quantity"
                        type={'number'}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.quantity}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <FormControl className={classes.formControl}>
                        <InputLabel>Category</InputLabel>
                        <Select
                            error={!!formik.errors.categoryName}
                            helperText={formik.errors.categoryName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.categoryName}
                            name={'categoryName'}
                            id={'category'}

                        >
                            <MenuItem value={'mobiles'}>Mobile</MenuItem>
                            <MenuItem value={'laptops'}>Laptops</MenuItem>
                            <MenuItem value={'appliances'}>Appliances</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        id="price"
                        label="Price"
                        name="price"
                        type={'number'}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={!!formik.errors.price}
                        helperText={formik.errors.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.price}
                    />
                    <TextField
                        variant="outlined"
                        required
                        id="image"
                        label="Image URL"
                        name="image"
                        fullWidth
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.image}
                        error={!!formik.errors.image}
                        helperText={formik.errors.image}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        multiline
                        name="description"
                        label="Description"
                        rows={4}
                        id="description"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={!formik.isValid}
                        className={classes.submit}
                        startIcon={<Add/>}
                    >
                        Add Product
                    </Button>

                </form>
            </div>

        </Container>
    )
}