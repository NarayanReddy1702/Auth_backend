
import express from "express"
import User from "../model/auth.mdoel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const router = express.Router()

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existUser = await User.findOne({ email });

        if (existUser) {
            return res.status(409).json({ message: "User Already Exist" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        if (!hashedPassword) {
            return res.status(500).json({ message: "Error in hashPassword" });
        }

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        if (!newUser) {
            return res.status(500).json({ message: "Error while creating new User" });
        }

        res.status(201).json({ message: "User registered successfully!", newUser ,success:true});

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Register error" });
    }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;


    const existUser = await User.findOne({ email });

    if (!existUser) {
      return res.status(401).json({ message: "Invalid email or password" });
    }


    const isMatch = await bcrypt.compare(password, existUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: existUser._id, email: existUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } 
    );

    res.status(200).json({
      message: "User logged  successfully!",
      user: {
        id: existUser._id,
        username: existUser.username,
        email: existUser.email,
        password:existUser.password
      },
      token,
      success:true
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/allUser", async (req,res)=>{
  try {
    const allUserData = await User.find()
   res.status(201).json({message:"getAll User Successfully !",allUserData})
  } catch (error) {
    res.status(404).json("Error in While getting the all user ")
  }
  
})

router.put("/updateUser/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ message: "Failed to get userID" });
    }

    const { username, email, password } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, password },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
      success:true
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
});



export default router