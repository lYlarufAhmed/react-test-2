import {useDispatch, useSelector} from "react-redux";
import {useHistory} from 'react-router-dom'
import Navbar from "./Navbar";
import {useEffect} from "react";
import {getItems} from "../redux/actions";
import ProductCard from "./ProductCard";

export default function ItemList(props) {
    const dispatch = useDispatch()
    const history = useHistory()
    const categoryName = props.match.params.categoryName
    const user = useSelector(state => state.app.loggedInUser)
    const loading = useSelector(state => state.app.loading)
    const items = useSelector(state => state.app.items[categoryName])
    useEffect(() => {
        dispatch(getItems(categoryName))
    }, [categoryName, dispatch])
    if (!user) history.push('/')
    return (
        <>
            <Navbar/>
            <div className={'item-list'}>
                items for {categoryName}<br/>
                {loading ? 'Loading':items.length ? items.map((item, index) => <ProductCard key={index} product={item}/>):'No Items for '+categoryName}
            </div>
        </>
    )
}