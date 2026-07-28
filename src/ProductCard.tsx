import './ProductCard.css'

export function ProductCard({image, productTitle, price, productDescription}: any) {
    return (
        <div className='product-card-container'>
         <img src={image} alt='shoe'/>
         <div className='title-section'>
            <h3>{productTitle}</h3>
            <span className='product-price'>{price}</span>
         </div>
         <p>{productDescription}</p>
         <button className="add-to-cart-btn">Add to cart</button>
        </div>
    )
}