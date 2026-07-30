export const Item = ({image,title,price}:any) => {
    return(
        <div>
            <div>
                <div>
                    <h4>{title}</h4>
                    <span>{price}</span>
                </div>
                {/* <button>Add to cart</button> */}
            </div>

        </div>
    );
}