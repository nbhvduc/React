import { useState } from "react";

import book1 from '../assets/images/Book1.png'
import book2 from '../assets/images/Book2.png'

import { Item } from "./Item";

export function ShoppingList() {
    const [items, setItems] = useState([
        {
            image: book1,
            title: 'book1'
        },
        {
            image: book2,
            title: 'book2'
        }
    ])
    const [bookTitle, setBookTitle] = useState('')
    

    const handleChange = (e: any ) => {
        setBookTitle(e.target.value)
    }

    const addBook = () => {
        const newItems = [...items, {title: bookTitle, image: ''}]
        setItems(newItems)
        setBookTitle('')
    }

    return(
        <div>
            <input type="text" value={bookTitle} onChange={handleChange}/>
            <button onClick={addBook}>Add book</button>
            {items.map((item, index) => <Item key={index} image={item.image} title={item.title}/>)}
        </div>
        
    );
}