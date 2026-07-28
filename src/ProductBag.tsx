import './ProductBag.css'

export function ProductBag({image,producttitle,price}:any){
    return(

        <div className="product_bag_container">
            <img className='product_image' src={image} alt="Bag"/>
            <div className="title_product">
                <h4>{producttitle}</h4>
                <span className="product_price">{price}</span>
            </div>
           <button className="button_to_bag">Add to bag</button>
        </div>
    )

    
}