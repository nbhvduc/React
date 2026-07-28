import './App.css'
import Shoe from './assets/images/image.png'
import Shoe1 from './assets/images/image1.png'

import { ProductCard } from './ProductCard'

// JSX -> HTML
// HTML co ban 
// Css co ban
// Javscription co ba

function App() {
  return (
    <div className='container'>
    <ProductCard image={Shoe} productTitle="Blue Snakers" price="$350" productDescription="Minimal Style, ultimate confort, prefect for any occasion."/>
    <ProductCard image={Shoe1} productTitle="Snakers" price="$250" productDescription="Minimal Style"/>
    </div>
  )
}

export default App
