import './App.css'

import Bag1 from './assets/images/image1.png'
import Bag2 from './assets/images/image2.png'
import { ProductBag } from './ProductBag'

function App() {
  return (
    <div>
     <ProductBag image={Bag1} 
     producttitle='キャンバス ショルダーバッグ 韓国 大容量 A4 通学 通勤 レディース メンズ'
     price="￥5000"/>

     <ProductBag image={Bag2}
     producttitle="ショルダーバッグ キャンバス地 クリアポケット付き クマちゃん付き 斜めがけ"
     price='￥4000'/>

     
    </div>
  
   
  )
}

export default App
