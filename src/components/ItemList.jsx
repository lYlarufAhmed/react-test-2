import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getItems} from "../redux/actions";
import ProductCard from "./ProductCard";

export default function ItemList(props) {
    const dispatch = useDispatch()
    const categoryName = props.match.params.categoryName
    const loading = useSelector(state => state.app.loading)
    const items = useSelector(state => state.app.items[categoryName])
    useEffect(() => {
        dispatch(getItems(categoryName))
    }, [categoryName, dispatch])
    return (
        <>
            <div className={'item-list'}>
                items for {categoryName}<br/>
                {loading ? 'Loading':items.length ? items.map((item, index) => <ProductCard key={index} product={item}/>):'No Items for '+categoryName}
            </div>
        </>
    )
}