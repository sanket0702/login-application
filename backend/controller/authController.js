import { userModel } from "../models/user.js";
import bcrypt from "bcrypt";
export const registerController=async(req,res)=>{
        try{
            const {email,address,phone,name,password}=req.body;

            const existingUser =await userModel.findOne({email});

            if (existingUser){
                res.status(404).send({
                    success:false,
                    message:"already register"
                });
            }
             // Generate 15-digit unique registration ID
        const timestampPart = Date.now().toString(); // 13 digits
        const randomPart = Math.floor(Math.random() * 90 + 10).toString(); // 2 digits
        const registrationId = timestampPart + randomPart; // 15 digits
                    // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

            const newUSer = new userModel({
                name,
                password:hashedPassword,address,email,phone,registrationId
            })

            await newUSer.save();

            res.status(200).send({
                sucess:true,
                message:"user Created successfully"
            })


        }catch(error){
            console.log(error)
        }

        
}