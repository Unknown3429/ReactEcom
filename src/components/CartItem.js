import FormatPrice from "../Helpers/FormatPrice"
import { useCartContext } from "../context/cart_context";
import CartAmountToggle from "./CartAmountToggle"
import { FaTrash } from "react-icons/fa";



const CartItem = ({ id, name, image, price, color, amount }) => {
    const { removeItem, setDecrease, setIncrease } = useCartContext();




    return (
        <div className="cart_heading grid grid-five-column">
            <div className="cart-image--name">
                <div>
                    <figure>
                        <img src={image} alt={id} />
                    </figure>
                </div>

                <div>
                    <p>{name}</p>
                    <div className="color-div">
                        <p>Color:</p>
                        <div style={{ backgroundColor: color, color: color }} className="color-style"></div>
                    </div>
                </div>
            </div>

            {/* price  */}
            <div className="cart-hide">
                <p> <FormatPrice price={price} /> </p>
            </div>

            <div >
                <CartAmountToggle
                    amount={amount}
                    setDecrease={() => setDecrease(id)}
                    setIncrease={() => setIncrease(id)}
                />
            </div>

            <div className="card-hide">
                <p><FormatPrice price={price * amount} /></p>
            </div>

            <div>
                <FaTrash className="remove_icon" onClick={() => removeItem(id)} />
            </div>


        </div>
    )
}

export default CartItem