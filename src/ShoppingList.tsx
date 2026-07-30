

export function ShoppingList({image,title,price}:any){
    return(
        <div>
            <div>
                <img src={image} alt="Book"/>
                <div>
                    <title>{title}</title>
                    <span>{price}</span>
                </div>
                <button>Add to cart</button>
            </div>

        </div>
    );
}