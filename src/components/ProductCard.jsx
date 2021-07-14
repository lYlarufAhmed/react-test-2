import React from "react";
import {useDispatch} from "react-redux";
import {deleteItemMiddleWare} from "../redux/actions";
import {FlexContainer, Img, NameDesc} from "./Styled";
import DeleteIcon from '@material-ui/icons/Delete';
import {Paper} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({

    paper: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: '100%'
    },
}));


export default function ProductCard({product}) {
    const dispatch = useDispatch()
    const classes = useStyles()
    const handleDelete = (id, category) => {
        dispatch(deleteItemMiddleWare(id, category))
    }
    return (
        <Paper className={classes.paper}>
            <FlexContainer>
                <Img src={product.image}/>
                <NameDesc>
                    <h4>{product.name}</h4>
                    <p>{product.description}</p>
                </NameDesc>
                <p>${product.price}</p>
            </FlexContainer>

            <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon/>}
                onClick={() => handleDelete(product.id, product.categoryName)}
            >Delete</Button>
        </Paper>
    )
}