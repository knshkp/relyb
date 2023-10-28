const Cart=require('../models/cartModel')
const addCart=async(req,res)=>{
    try {
        const cart_obj=new Cart({
            customer_phone:req.body.phone,
            product_name:req.body.product_name,
            price:req.body.price
        });
        const cartData=await cart_obj.save();
        res.status(200).send({success:true,msg:'Add to Buy Now Option',data:cartData});

    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
    }

}
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
    getCart
}