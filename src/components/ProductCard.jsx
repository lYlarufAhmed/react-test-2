import React from "react";
import {useDispatch} from "react-redux";
import {deleteItemMiddleWare} from "../redux/actions";
import {FlexContainer, NameDesc} from "./Styled";
import DeleteIcon from '@material-ui/icons/Delete';
import {Paper} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({

    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
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
                <NameDesc>
                    <p>{product.name}</p>
                    <p>{product.description}</p>
                </NameDesc>
                <p>${product.price}</p>
            </FlexContainer>

            <div className="control">
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon/>}
                    onClick={() => handleDelete(product.id, product.categoryName)}
                >Delete</Button></div>
        </Paper>
    )
}