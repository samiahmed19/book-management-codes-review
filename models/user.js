import { Schema, model } from "mongoose";
import { hash, compare } from 'bcrypt';
const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    userid:{
      type:String,
      required:true
    },
    isAdmin:{
      type:Boolean,
      default:false
    },
    reviews: [
      {
          user: String,
          rating: Number, 
          comment: String,
      }
  ],
});

userSchema.pre('save', async function (next) {
    try {
      if (!this.isModified('password')) {
        return next();
      }
      const hashedPassword = await hash(this.password, 10);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  });
  userSchema.methods.comparePassword = async function (password) {
    return compare(password, this.password);
  };
const UserData = model('UserData',userSchema);
export default UserData;