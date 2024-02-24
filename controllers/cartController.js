const Cart=require('../models/cartModel')
const addCart = async (req, res) => {
    try {
        const { phone, product_name, price, quantity } = req.body;

        // Check if the product is already in the cart
        const existingCartItem = await Cart.findOne({
            customer_phone: phone,
            product_name: product_name
        });

        if (existingCartItem) {
            // If the product is found, increase the quantity and update the price
            existingCartItem.quantity += quantity;
            existingCartItem.price += price;
            await existingCartItem.save();
            res.status(200).send({ success: true, msg: 'Product quantity updated in the cart', data: existingCartItem });
        } else {
            // If the product is not found, add a new entry to the cart
            const cart_obj = new Cart({
                customer_phone: phone,
                product_name: product_name,
                price: price,
                quantity: quantity
            });

            const cartData = await cart_obj.save();
            res.status(200).send({ success: true, msg: 'Product added to the cart', data: cartData });
        }
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
};

const removeCart = async (req, res) => {
    try {
        const { phone, product_name, quantity } = req.body;

        // Find the cart item to remove
        const cartItemToRemove = await Cart.findOne({
            customer_phone: phone,
            product_name: product_name
        });

        if (!cartItemToRemove) {
            return res.status(404).send({ success: false, msg: 'Product not found in the cart' });
        }

        if (cartItemToRemove.quantity > 1) {
            // If the product quantity is greater than 1, decrease the quantity
            cartItemToRemove.quantity -= quantity;
            await cartItemToRemove.save();
            res.status(200).send({ success: true, msg: 'Product quantity decreased in the cart', data: cartItemToRemove });
        } else {
            // If the product quantity is 1 or less, remove the entire item from the cart
            await cartItemToRemove.remove();
            res.status(200).send({ success: true, msg: 'Product removed from the cart', data: cartItemToRemove });
        }
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
};



const getCart=async(req,res)=>{
    try {
        const phone=req.body.phone;
        const cart_data = await Cart.findOne({customer_phone:phone});
        if(cart_data){
        const cartResult = {
            name: cart_data.product_name,
            price:cart_data.price
        };
    
          const response = {
            success: true,
            msg: "BuyDetail",
            data: cartResult,
          };
          res.status(200).send(response);
        }
        else{
            res.status(200).send({success:true,msg:"data is null"})
        }
    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
    }
}
module.exports={
    addCart,
    getCart,
    removeCart
}