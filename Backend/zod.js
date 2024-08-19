// const { z } = require("zod");
import {z} from "zod";

export const signupBody = z.object({
    username: z.string().max(20),
    password: z.string().min(6),
    firstName: z.string(),
    lastName: z.string()
})

export const signinBody = z.object({
    username: z.string(),
    password: z.string()
})

export const updateBody = z.object({
    username: z.string().optional(),
    password: z.string().min(6).max(10).optional(),
    firstName: z.string().optional(),
    lastname: z.string().optional()
})

