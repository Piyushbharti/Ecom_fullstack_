const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email address");
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cartData'
    }],
    cartCount : {
        type: Number
    }
})

UserSchema.pre('save', async function(next){
    if(this.isModified("password")){
        console.log(`currect password ${this.password}`)
        this.password = await bcrypt.hash(this.password, 10)
        console.log(`current password ${this.password}`)
    }
    next()
})

UserSchema.methods.createJWT = function () {
    return jwt.sign(
      { userId: this._id, name: this.name },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );
  };

UserSchema.methods.comparePassword = async function (canditatePassword) {
const isMatch = await bcrypt.compare(canditatePassword, this.password);
return isMatch;
};
// UserSchema.methods.generateAuthToken = async function(){
//     try{
        // const token = jwt.sign({_id: this._id.toString()}, "myNameisPiyushBhartiUserofthiswebsite")
        // this.tokens = this.tokens({})
        // console.log(token, 'this is token')
        // await this.save()
        // return token
        // UserSchema.methods.generateAuthToken = function () {
        //     return jwt.sign(
        //       { userId: this._id, name: this.username },
        //       process.env.JWT_SECRET,
        //       {
        //         expiresIn: process.env.JWT_EXPIRE,
        //       }
        //     );
        //   };
//     }catch(e){
//         res.send('this error part' + error)
//         console.log('the error part ' + error )
//     }
// }




const User = mongoose.model('userData', UserSchema)
module.exports = User