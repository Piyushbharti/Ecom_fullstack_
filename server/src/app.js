const express =  require('express')
const app = express()
app.use(express.json());
// const path = require('path')
require('./db/conn')
const cors = require('cors');
const User = require('./models/user')
const Cart = require('./models/cart')
const bcrypt = require('bcryptjs');
const sendToken = require('./utils/jwtToken');
require("dotenv").config();
const port = process.env.PORT || 8000

// const static_path = path.join(__dirname, '../public')
// console.log(path.join(__dirname, '../public')


app.use(cors());

app.post("/singin", async(req, res)=>{
    const { name, email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      const newUser = new User({ name, email, password });
      await newUser.save();
    
      sendToken(newUser, 201, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
})


app.post("/login", async(req, res)=>{
    try{
        const email = req.body.email
        const password = req.body.password
        const user = await User.findOne({ email }).select("+password")
        // const user = await User.findOne({email:email})
        // const token = await user.generateAuthToken() 
        console.log(user,'token of login ')
        const isPasswordCorrect = await user.comparePassword(password);
        console.log(isPasswordCorrect,'hellopass')
        if (!isPasswordCorrect) {
            res.status(401).json("Invalid Email or Password!")
        }

        // const isMatch = await bcrypt.compare(password, user.password)
        // console.log(user,'user')
        // if(isMatch){
            // res.status(200).json({
            //     success: true,
            //     user
            // })
        sendToken(user, 200, res)
        // }
        // else{
        //     res.status(401).send("Invalid Email or Password!")
        // }
    }catch(e){
        res.status(401).json("Invalid Email or Password!")
    }
}) 

// app.post("/cart/:id", async(req, res) => {
//     try {
//         const cartItems = req.body; 
//         const user = req.params.id;
//         const savedCartItems = await Promise.all(cartItems.map(async (item) => {
//             const { product, images, price } = item;
//             const createCart = new Cart({ product, images, price, user });
//             return createCart.save();
//         }));

//         // Push the IDs of the saved cart items into the user's cart array
//         const cartItemIds = savedCartItems.map(item => item._id);
//         await User.findByIdAndUpdate(user, { $push: { cart:  cartItemIds  } });

//         // Populate the user data with the cart items
//         const userData = await User.findById(user).populate('cart');
        
//         console.log(userData.cart.length());

//         // Send the populated user data back as the response
//         res.status(200).json({ userData });
//     } catch (e) {
//         console.log(e);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

app.post("/cart/:id", async(req, res)=>{
    try{
        const {product, images, price} = req.body
        const user = req.params.id
        console.log(product, images, price, user,req.body)
        const createCart = new Cart({product, images, price, user}) 
        await createCart.save()
        await User.findByIdAndUpdate(user, {
            $push: {cart: createCart.toObject()}
        })
        const userData = await User.findById({_id : user}).populate('cart')
        console.log(userData)
        // const temp = await Cart.findOne({user: req.params.id}).populate('user')
        // console.log(temp,"hello123")
        // res.send(createCart)
        res.status(200).json({userData})
    }catch(e){
        console.log(e)
    }
    })

app.get('/cartItem/:id', async(req, res)=>{
    try{
        const _id = req.params.id
        console.log(_id)
        const userCartData = await User.findById({_id}).populate('cart')
        const cartCount = userCartData.cart.length
        userCartData.cartCount = cartCount
        res.status(200).json({userCartData})
    }catch(e){
        console.log(e)
    }
})

// app.get('/cartCount/:id', async(req, res)=>{
//     try{
//         const _id = req.params.id 
//         const userCartData = await user.findById({_id}).populate('cart')
//         console.log(userCartData)
//     }catch(e){
//         console.log(e)
//     }
// })
 
app.listen(port, ()=>{
    console.log('server running')
})  
