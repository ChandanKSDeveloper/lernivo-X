import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: [true, "Name is required"],
    minLength: [3, "Name must be at least 3 characters"],
  },

  email: {
    type: String,
    trim: true,
    require: [true, "Email is required"],
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    require: [true, "Password is required"],
    select: false,
    // todo -> add minLength
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// todo -> create jwt

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}


const User = mongoose.model("User", userSchema);

export default User;
