import './ProductBag.css'
import { useState } from 'react'

export function ProductBag({image,producttitle,price}:any){
    const [count,setCount]=useState(0)
    return(

        <div className="product_bag_container">
            <img className='product_image' src={image} alt="Bag"/>
            <div className="title_product">
                <h4>{producttitle}</h4>
                <span className="product_price">{price}</span>
            </div>
          
           <button onClick={()=>setCount(count+1)}>Add to bag({count})</button>
        </div>
    )

    
}