import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getItems} from "../redux/actions";
import ProductCard from "./ProductCard";
import {Snackbar} from "@material-ui/core";
import {Alert} from "./Login";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

export default function ItemList(props) {
    const dispatch = useDispatch()
    const categoryName = props.match.params.categoryName
    const loading = useSelector(state => state.app.loading)
    const items = useSelector(state => state.app.items[categoryName])
    useEffect(() => {
        dispatch(getItems(categoryName))
    }, [categoryName, dispatch])
    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline/>
            <Snackbar open={loading}>
                <Alert severity="warning">
                    Loading
                </Alert>
            </Snackbar>
            <div className={'item-list'}>
                {items.length ? items.map((item, index) => <ProductCard key={index}
                                                                        product={item}/>) : 'No Items for ' + categoryName}
            </div>
        </Container>
    )
}