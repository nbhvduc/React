import './Cssbasic.css'
import image1 from './assets/images/image1.png'


export const Cssbasic =() => {

    /**
     * HTML gồm có 2 loại là block element và inline element
     * 
     */

    /**
     * Box model: 
     * margin không tính vào chiều rộng, chiều cao của element
     * padding, border: sẽ được tính vào chiều rộng, chiều cao của element
     */

    /**
     * display
     * inline: chiếm đúng diện tích của element, và cho phép element bên dưới có thể hiện thị trên cùng 1 hàng, elment bên dưới cũng là inline element hoặc là display: inline 
     * block: chiếm hết toàn bộ 1 hàng (chiếm hết chiều ngang)
     * inline-block: vừa hiển dạng của inline element mà vừa có thuộc tính của block element, ví dụ là margin của elmenent này sẽ được áp dụng
     * flex
     */

    return (
        <div>
        {/* <h1 className="h1">h1</h1>
        <h2 className="h2">h2</h2>
        <div>block element</div>
        <button className='button'>Add to cart</button>
        <a> a - inline element</a> <span>span- inline element</span> */}

        <div className='box-container'>
            <img src={image1}/>
            <div>
                <h4>Bag</h4>
                <p>It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.</p>
                <span>$350</span>
            </div>
        </div>
        </div>
    )
}