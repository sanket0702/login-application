import { userModel } from "../models/user.js";
import bcrypt from "bcrypt";

export const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Invalid user"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: "Invalid password"
            });
        }

        // Success
        res.status(200).send({
            success: true,
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
                // Don't send password or sensitive info!
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Server error"
        });
    }
};
