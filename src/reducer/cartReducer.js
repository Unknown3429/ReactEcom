const cartReducer = (state, action) => {
    if (action.type === "ADD_TO_CART") {
        let { id, color, amount, product } = action.payload;

        let existingProduct = state.cart.find(
            (curItem) => curItem.id === id + color
        );

        if (existingProduct) {
            let updatedProduct = state.cart.map((curElem) => {
                if (curElem.id === id + color) {
                    let newAmount = curElem.amount + amount;

                    if (newAmount >= curElem.max) {
                        newAmount = curElem.max;
                    }
                    return {
                        ...curElem,
                        amount: newAmount,
                    };
                } else {
                    return curElem;
                }
            });
            return {
                ...state,
                cart: updatedProduct,
            };
        }

        else {
            let cartProduct;

            cartProduct = {
                id: id + color,
                name: product.name,
                color,
                amount,
                image: product.image[0].url,
                price: product.price,
                max: product.stock,
            };

            return {
                ...state,
                cart: [...state.cart, cartProduct],
            };
        }
    }


    // For set Increment And decrement 
    if (action.type === "SET_DECREMENT") {
        let updatedProduct = state.cart.map((curElem) => {
            if (curElem.id === action.payload) {
                let decAmount = curElem.amount - 1

                return {
                    ...curElem,
                    amount: decAmount < 1 ? 1 : decAmount
                }
            }
            else {
                return curElem;
            }
        })

        return {
            ...state,
            cart: updatedProduct
        }
    }


    if (action.type === "SET_INCREMENT") {
        let updatedProduct = state.cart.map((curElem) => {
            if (curElem.id === action.payload) {
                let incAmount = curElem.amount + 1

                return {
                    ...curElem,
                    amount: incAmount >= curElem.max ? curElem.max : incAmount
                }
            }
            else {
                return curElem;
            }
        })

        return {
            ...state,
            cart: updatedProduct
        }
    }


    if (action.type === "REMOVE_ITEM") {
        let updatedCart = state.cart.filter(
            (curItem) => curItem.id !== action.payload
        );
        return {
            ...state,
            cart: updatedCart,
        };
    }

    if (action.type === "CLEAR_CART") {
        return {
            ...state,
            cart: [],
        }
    }


    if (action.type === "CART_TOTAL_ITEM_PRICE") {
        let { total_item, total_price } = state.cart.reduce((initialVal, curElem) => {
            let { price, amount } = curElem;

            initialVal.total_price += (price * amount);
            initialVal.total_item += (amount);

            return initialVal;
        }, {
            total_item: 0,
            total_price: 0,
        });

        return {
            ...state,
            total_price,
            total_item
        };
    }




    return state;
};

export default cartReducer;