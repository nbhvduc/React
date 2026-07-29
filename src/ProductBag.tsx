import './ProductBag.css'
import { useState } from 'react'

export function ProductBag({image,producttitle,price}:any){
    const [count,setCount]=useState(0)
    return(

        <div className="product_bag_container">
            <div className='edit_content_product'>
                <img className='product_image' src={image} alt="Bag"/>
                <div className="title_product">
                    <h4>{producttitle}</h4>
                    <span className="product_price">{price}</span>
                </div>
            </div>
            <div className='edit_btn'>
                <button className='first_button' onClick={()=>setCount(count+1)}>Add to bag({count})</button>
                <button className='second_button' onClick={()=>{if(count>0) setCount(count-1)}}>Undo</button>
            </div>
        </div>
    );

    
}