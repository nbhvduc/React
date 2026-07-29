
import Bag1 from './assets/images/image1.png'
import Bag2 from './assets/images/image2.png'
import { ProductBag } from './ProductBag'
import './ProductBag.css'

const products=[
        {
            id:1,
            image:Bag1,
            title:'キャンバス ショルダーバッグ 韓国 大容量 A4 通学 通勤 レディース メンズ',
            price:5000
        },
        {
            id:2,
            image:Bag2,
            title:'ショルダーバッグ キャンバス地 クリアポケット付き クマちゃん付き 斜めがけ',
            price:4000
        }
    ]

export function Products(){
   
    return(
        
        <div className='product_css'>
            {products.map((product)=>(
                <ProductBag
                key={product.id}
                image={product.image}
                producttitle={product.title}
                price={`￥${product.price}`}
                />
            ))}

        </div>
    )
}
 