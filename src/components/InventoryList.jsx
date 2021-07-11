// import {useAuthState} from "react-firebase-hooks/auth";
// import {auth} from "../firebaseProvider";
import {
    useDispatch,
} from "react-redux";
import React, {useRef} from "react";
import {Link} from "react-router-dom";
import { addProduct} from "../redux/actions";


export default function InventoryList(props) {

    let nameRef = useRef()
    let imageRef = useRef()
    let categoryRef = useRef()
    let priceRef = useRef()
    let quantityRef = useRef()
    let descriptionRef = useRef()

    let dispatch = useDispatch()
    const handleAddProduct = () => {
        let refs = [
            nameRef, imageRef, categoryRef, priceRef, quantityRef, descriptionRef
        ]
        let values = {}
        for (let ref of refs) {
            console.log(ref.current.name, 'name')
            let refValue = ref.current.value
            // if (ref.current.required && !refValue) return
            values[ref.current.name] = refValue
        }
        dispatch(addProduct(values))
        console.log('going to add product ', values)
    }

    return (
        <>
            <h1>Inventory list</h1>
            <ul>
                <li><Link to={'/category/mobiles'}>Mobiles</Link></li>
                <li><Link to={'/category/laptops'}>Laptops</Link></li>
                <li><Link to={'/category/appliances'}>Appliances</Link></li>
            </ul>
            <div className={'input-control'}>
                <input type={'number'} ref={quantityRef} defaultValue={0} name={'quantity'} placeholder={'quantity'}
                       min={0}/>
                <input type={'text'} ref={descriptionRef} name={'description'} placeholder={'description'}/>
                <input placeholder={'category name'} ref={categoryRef} required={true} name={'categoryName'}
                       type={'text'}/>
                <input placeholder={'Price'} min={0} name={'price'} ref={priceRef} required={true} type={'number'}/>
                <input name={'name'} placeholder={'name'} type={'text'} ref={nameRef} required={true}/>
                <input name={'image'} placeholder={'image'} ref={imageRef} type={'url'}/>
                <button onClick={()=>handleAddProduct()}>Add Product</button>
            </div>
        </>
    )
}