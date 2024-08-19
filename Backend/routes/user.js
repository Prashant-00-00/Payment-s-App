import { Router } from "express";
export const userRouter = Router();
import { User, Account } from "../db.js";
import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;
import { JWT_SECRET } from "../config.js";
import { signupBody, signinBody, updateBody } from "../zod.js";

userRouter.post('/signup', async (req, res) => {
    try {
        console.log("Signup Request Started");

        const bodyparser = req.body;
        const { success } = signupBody.safeParse(bodyparser);

        if (!success) {
            return res.status(400).json({
                msg: "Error Occurred"
            });
        }

        const existingUser = await User.findOne({
            username: bodyparser.username
        });

        if (existingUser) {
            return res.status(400).json({
                msg: "User already exists"
            });
        }

        const user = await User.create({
            username: bodyparser.username,
            password: bodyparser.password,
            firstName: bodyparser.firstName,
            lastName: bodyparser.lastName
        });

        const userId = user._id;
        const token = sign({ userId }, JWT_SECRET);

        await Account.create({
            userId,
            balance: 1 + Math.random() * 10000
        });

        res.status(200).json({
            msg: "User Created successfully",
            token: token
        });
    } catch (error) {
        res.status(500).json({
            msg: "Server error"
        });
    }
});

userRouter.post('/signin', async (req, res) => {
    try {
        const { success } = signinBody.safeParse(req.body);
        if (!success) {
            return res.status(411).json({
                message: "Incorrect inputs"
            });
        }

        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        });

        if (user) {
            const token = sign({
                userId: user._id
            }, JWT_SECRET);

            res.json({
                token: token,
                firstName: user.firstName
            });
            return;
        }

        res.status(411).json({
            message: "No user found"
        });
    } catch (error) {
        res.status(500).json({
            msg: "Server error"
        });
    }
});

userRouter.put('/update', async (req, res) => {
    const { success } = updateBody.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            msg: "Invalid request data"
        });
    }

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            msg: "Unauthorized"
        });
    }

    try {
        const decoded = verify(token, JWT_SECRET);
        const userId = decoded.userId;

        const updateData = {};
        if (req.body.firstName) updateData.firstName = req.body.firstName;
        if (req.body.lastName) updateData.lastName = req.body.lastName;
        if (req.body.password) updateData.password = req.body.password;

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        res.status(200).json({
            msg: "User updated successfully",
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({
            msg: "Server error",
        });
    }
});

userRouter.delete('/delete', async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            msg: "Unauthorized"
        });
    }

    try {
        const decoded = verify(token, JWT_SECRET);
        const userId = decoded.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        await User.findByIdAndDelete(userId);

        res.status(200).json({
            msg: "User deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            msg: "Server error"
        });
    }
});

userRouter.get('/bulk', async (req, res) => {
    try {
        const filter = req.query.filter || "";

        const users = await User.find({
            $or: [{
                firstName: {
                    "$regex": filter,
                    "$options": "i"
                }
            }, {
                lastName: {
                    "$regex": filter,
                    "$options": "i"
                }
            }]
        });

        res.json({
            user: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        });
    } catch (error) {
        res.status(500).json({
            msg: "Server error"
        });
    }
});
