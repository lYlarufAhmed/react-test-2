import React from "react";
import {useDispatch} from "react-redux";
import {deleteItemMiddleWare} from "../redux/actions";
import {FlexContainer, NameDesc} from "./Styled";

export default function ProductCard({product}) {
    const dispatch = useDispatch()
    const handleDelete = (id, category)=>{
        dispatch(deleteItemMiddleWare(id, category))
    }
    return (
        <div className={'card'}>
            <FlexContainer>
                <NameDesc>
                 <p>{product.name}</p>
                <p>{product.description}</p>
                </NameDesc>
                <p>{product.price}</p>
            </FlexContainer>
            <div className="control">
                <button onClick={()=>handleDelete(product.id, product.categoryName)}>del</button>
            </div>
        </div>
    )
}